import { useCallback, useEffect, useRef, useState } from 'react';

import {
  getBlockSummaries,
  getLatestBlockNumber,
  getRecentBlocks,
} from '../services/blockService';
import {
  NETWORK_ACTIVITY_ERROR_MESSAGE,
  getErrorDetail,
} from '../lib/errorMessages';

const POLL_INTERVAL = 12000;
const BLOCK_LIMIT = 6;

export function mergeRecentBlocks(current, incoming, limit = BLOCK_LIMIT) {
  const seen = new Set();

  return [...incoming, ...current]
    .filter((block) => {
      if (!block || seen.has(block.number)) return false;
      seen.add(block.number);
      return true;
    })
    .sort((a, b) => b.number - a.number)
    .slice(0, limit);
}

function useRecentBlocks() {
  const [latestBlockNumber, setLatestBlockNumber] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [errorDetail, setErrorDetail] = useState('');
  const [attempt, setAttempt] = useState(0);
  const latestBlockRef = useRef(null);

  useEffect(() => {
    let active = true;
    let timerId = 0;
    let requestInFlight = false;

    function scheduleNextPoll(delay = POLL_INTERVAL) {
      window.clearTimeout(timerId);
      if (active) timerId = window.setTimeout(checkForNewBlocks, delay);
    }

    async function loadRecentBlocks() {
      try {
        setLoading(true);
        setError('');

        const data = await getRecentBlocks();

        if (!active) return;

        latestBlockRef.current = data.latestBlockNumber;
        setLatestBlockNumber(data.latestBlockNumber);
        setBlocks(data.blocks);
        setErrorDetail('');
      } catch (err) {
        if (!active) return;

        setError(NETWORK_ACTIVITY_ERROR_MESSAGE);
        setErrorDetail(getErrorDetail(err));
      } finally {
        if (!active) return;
        setLoading(false);
        scheduleNextPoll();
      }
    }

    async function checkForNewBlocks() {
      if (!active || requestInFlight) return;
      if (document.hidden) {
        scheduleNextPoll();
        return;
      }

      requestInFlight = true;
      try {
        if (latestBlockRef.current === null) {
          const snapshot = await getRecentBlocks(BLOCK_LIMIT);
          if (!active) return;
          latestBlockRef.current = snapshot.latestBlockNumber;
          setLatestBlockNumber(snapshot.latestBlockNumber);
          setBlocks(snapshot.blocks);
          setError('');
          setErrorDetail('');
          setLoading(false);
          return;
        }

        const nextLatest = await getLatestBlockNumber();
        if (!active || nextLatest <= latestBlockRef.current) {
          return;
        }

        const firstNewBlock = Math.max(
          latestBlockRef.current + 1,
          nextLatest - BLOCK_LIMIT + 1,
        );
        const unseenNumbers = Array.from(
          { length: nextLatest - firstNewBlock + 1 },
          (_, index) => nextLatest - index,
        );
        const unseenBlocks = await getBlockSummaries(unseenNumbers);
        if (!active) return;

        latestBlockRef.current = nextLatest;
        setLatestBlockNumber(nextLatest);
        setBlocks((current) => mergeRecentBlocks(current, unseenBlocks));
        setError('');
        setErrorDetail('');
      } catch {
        // Preserve the last usable snapshot when a background refresh fails.
      } finally {
        requestInFlight = false;
        scheduleNextPoll();
      }
    }

    function handleVisibilityChange() {
      if (!document.hidden) scheduleNextPoll(0);
    }

    loadRecentBlocks();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      active = false;
      window.clearTimeout(timerId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [attempt]);

  const retry = useCallback(() => setAttempt((value) => value + 1), []);

  return {
    latestBlockNumber,
    blocks,
    loading,
    error,
    errorDetail,
    retry,
  };
}

export default useRecentBlocks;

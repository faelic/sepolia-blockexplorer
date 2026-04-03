import { useEffect, useState } from 'react';

import { getRecentBlocks } from '../services/blockService';

function useRecentBlocks() {
  const [latestBlockNumber, setLatestBlockNumber] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadRecentBlocks() {
      try {
        setLoading(true);
        setError('');

        const data = await getRecentBlocks();

        if (!isMounted) {
          return;
        }

        setLatestBlockNumber(data.latestBlockNumber);
        setBlocks(data.blocks);
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setError(err.message || 'Failed to load recent blocks.');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadRecentBlocks();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    latestBlockNumber,
    blocks,
    loading,
    error,
  };
}

export default useRecentBlocks;

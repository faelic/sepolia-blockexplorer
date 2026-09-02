import { useCallback, useEffect, useState } from 'react';

import { getBlockDetails } from '../services/blockService';

function useBlockDetails(blockId) {
  const [attempt, setAttempt] = useState(0);
  const [request, setRequest] = useState({
    key: null,
    block: null,
    status: 'idle',
    error: '',
    errorType: '',
  });

  useEffect(() => {
    if (!blockId) {
      return;
    }

    let isMounted = true;

    async function loadBlockDetails() {
      try {
        setRequest({
          key: blockId,
          block: null,
          status: 'loading',
          error: '',
          errorType: '',
        });

        const data = await getBlockDetails(blockId);

        if (!isMounted) {
          return;
        }

        setRequest({
          key: blockId,
          block: data,
          status: 'success',
          error: '',
          errorType: '',
        });
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setRequest({
          key: blockId,
          block: null,
          status: 'error',
          error: err.message || 'Failed to load block details.',
          errorType: err.code === 'NOT_FOUND' ? 'not-found' : 'network',
        });
      }
    }

    loadBlockDetails();

    return () => {
      isMounted = false;
    };
  }, [attempt, blockId]);

  const retry = useCallback(() => setAttempt((value) => value + 1), []);
  const isCurrentRequest = request.key === blockId;

  return {
    block: isCurrentRequest ? request.block : null,
    loading: Boolean(blockId) && (!isCurrentRequest || request.status === 'loading'),
    error: isCurrentRequest ? request.error : '',
    errorType: isCurrentRequest ? request.errorType : '',
    retry,
  };
}

export default useBlockDetails;

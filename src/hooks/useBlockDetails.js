import { useCallback, useEffect, useState } from 'react';

import { getBlockDetails } from '../services/blockService';
import { NETWORK_ERROR_MESSAGE, getErrorDetail } from '../lib/errorMessages';

function useBlockDetails(blockId) {
  const [attempt, setAttempt] = useState(0);
  const [request, setRequest] = useState({
    key: null,
    block: null,
    status: 'idle',
    error: '',
    errorDetail: '',
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
          errorDetail: '',
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
          errorDetail: '',
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
          error: err.code === 'NOT_FOUND' ? 'Block not found.' : NETWORK_ERROR_MESSAGE,
          errorDetail: err.code === 'NOT_FOUND' ? '' : getErrorDetail(err),
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
    errorDetail: isCurrentRequest ? request.errorDetail : '',
    errorType: isCurrentRequest ? request.errorType : '',
    retry,
  };
}

export default useBlockDetails;

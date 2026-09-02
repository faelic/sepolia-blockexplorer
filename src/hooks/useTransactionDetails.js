import { useCallback, useEffect, useState } from 'react';

import { getTransactionDetails } from '../services/transactionService';
import { NETWORK_ERROR_MESSAGE, getErrorDetail } from '../lib/errorMessages';

function useTransactionDetails(txHash) {
  const [attempt, setAttempt] = useState(0);
  const [request, setRequest] = useState({
    key: null,
    transaction: null,
    receipt: null,
    status: 'idle',
    error: '',
    errorDetail: '',
    errorType: '',
  });

  useEffect(() => {
    if (!txHash) {
      return;
    }

    let isMounted = true;

    async function loadTransactionDetails() {
      try {
        setRequest({
          key: txHash,
          transaction: null,
          receipt: null,
          status: 'loading',
          error: '',
          errorDetail: '',
          errorType: '',
        });

        const data = await getTransactionDetails(txHash);

        if (!isMounted) {
          return;
        }

        setRequest({
          key: txHash,
          transaction: data.transaction,
          receipt: data.receipt,
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
          key: txHash,
          transaction: null,
          receipt: null,
          status: 'error',
          error: err.code === 'NOT_FOUND' ? 'Transaction not found.' : NETWORK_ERROR_MESSAGE,
          errorDetail: err.code === 'NOT_FOUND' ? '' : getErrorDetail(err),
          errorType: err.code === 'NOT_FOUND' ? 'not-found' : 'network',
        });
      }
    }

    loadTransactionDetails();

    return () => {
      isMounted = false;
    };
  }, [attempt, txHash]);

  const retry = useCallback(() => setAttempt((value) => value + 1), []);
  const isCurrentRequest = request.key === txHash;

  return {
    transaction: isCurrentRequest ? request.transaction : null,
    receipt: isCurrentRequest ? request.receipt : null,
    loading: Boolean(txHash) && (!isCurrentRequest || request.status === 'loading'),
    error: isCurrentRequest ? request.error : '',
    errorDetail: isCurrentRequest ? request.errorDetail : '',
    errorType: isCurrentRequest ? request.errorType : '',
    retry,
  };
}

export default useTransactionDetails;

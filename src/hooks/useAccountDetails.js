import { useCallback, useEffect, useState } from 'react';

import { getAccountDetails } from '../services/accountService';
import { NETWORK_ERROR_MESSAGE } from '../lib/errorMessages';

function useAccountDetails(address) {
  const [attempt, setAttempt] = useState(0);
  const [request, setRequest] = useState({
    key: null,
    balance: null,
    transactionCount: null,
    status: 'idle',
    error: '',
  });

  useEffect(() => {
    if (!address) {
      return;
    }

    let isMounted = true;

    async function loadAccountDetails() {
      try {
        setRequest({
          key: address,
          balance: null,
          transactionCount: null,
          status: 'loading',
          error: '',
        });

        const data = await getAccountDetails(address);

        if (!isMounted) {
          return;
        }

        setRequest({
          key: address,
          balance: data.balance,
          transactionCount: data.transactionCount,
          status: 'success',
          error: '',
        });
      } catch {
        if (!isMounted) {
          return;
        }

        setRequest({
          key: address,
          balance: null,
          transactionCount: null,
          status: 'error',
          error: NETWORK_ERROR_MESSAGE,
        });
      }
    }

    loadAccountDetails();

    return () => {
      isMounted = false;
    };
  }, [address, attempt]);

  const retry = useCallback(() => setAttempt((value) => value + 1), []);
  const isCurrentRequest = request.key === address;

  return {
    balance: isCurrentRequest ? request.balance : null,
    transactionCount: isCurrentRequest ? request.transactionCount : null,
    loading: Boolean(address) && (!isCurrentRequest || request.status === 'loading'),
    error: isCurrentRequest ? request.error : '',
    errorType: isCurrentRequest && request.error ? 'network' : '',
    retry,
  };
}

export default useAccountDetails;

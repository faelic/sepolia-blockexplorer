import { useCallback, useEffect, useState } from 'react';

import { getAddressTransfers } from '../services/transferService';

function useAddressTransfers(address) {
  const [attempt, setAttempt] = useState(0);
  const [request, setRequest] = useState({
    key: null,
    transfers: [],
    status: 'idle',
    error: '',
  });

  useEffect(() => {
    if (!address) {
      return;
    }

    let isMounted = true;

    async function loadTransfers() {
      try {
        setRequest({
          key: address,
          transfers: [],
          status: 'loading',
          error: '',
        });

        const data = await getAddressTransfers(address);

        if (!isMounted) {
          return;
        }

        setRequest({
          key: address,
          transfers: data,
          status: 'success',
          error: '',
        });
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setRequest({
          key: address,
          transfers: [],
          status: 'error',
          error: err.message || 'Failed to load transfers.',
        });
      }
    }

    loadTransfers();

    return () => {
      isMounted = false;
    };
  }, [address, attempt]);

  const retry = useCallback(() => setAttempt((value) => value + 1), []);
  const isCurrentRequest = request.key === address;

  return {
    transfers: isCurrentRequest ? request.transfers : [],
    loading: Boolean(address) && (!isCurrentRequest || request.status === 'loading'),
    error: isCurrentRequest ? request.error : '',
    retry,
  };
}

export default useAddressTransfers;

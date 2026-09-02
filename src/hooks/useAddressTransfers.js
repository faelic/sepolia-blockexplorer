import { useCallback, useEffect, useState } from 'react';

import { getAddressTransfers } from '../services/transferService';
import { TRANSFERS_ERROR_MESSAGE, getErrorDetail } from '../lib/errorMessages';

function useAddressTransfers(address) {
  const [attempt, setAttempt] = useState(0);
  const [request, setRequest] = useState({
    key: null,
    transfers: [],
    status: 'idle',
    error: '',
    errorDetail: '',
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
          errorDetail: '',
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
          errorDetail: '',
        });
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setRequest({
          key: address,
          transfers: [],
          status: 'error',
          error: TRANSFERS_ERROR_MESSAGE,
          errorDetail: getErrorDetail(err),
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
    errorDetail: isCurrentRequest ? request.errorDetail : '',
    retry,
  };
}

export default useAddressTransfers;

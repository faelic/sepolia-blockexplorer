import { useEffect, useState } from 'react';

import { getAddressTransfers } from '../services/transferService';

function useAddressTransfers(address) {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!address) {
      return;
    }

    let isMounted = true;

    async function loadTransfers() {
      try {
        setLoading(true);
        setError('');

        const data = await getAddressTransfers(address);

        if (!isMounted) {
          return;
        }

        setTransfers(data);
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setError(err.message || 'Failed to load transfers.');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadTransfers();

    return () => {
      isMounted = false;
    };
  }, [address]);

  return {
    transfers,
    loading,
    error,
  };
}

export default useAddressTransfers;

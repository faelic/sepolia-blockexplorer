import { useEffect, useState } from 'react';

import { getAccountDetails } from '../services/accountService';

function useAccountDetails(address) {
  const [balance, setBalance] = useState(null);
  const [transactionCount, setTransactionCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!address) {
      return;
    }

    let isMounted = true;

    async function loadAccountDetails() {
      try {
        setLoading(true);
        setError('');

        const data = await getAccountDetails(address);

        if (!isMounted) {
          return;
        }

        setBalance(data.balance);
        setTransactionCount(data.transactionCount);
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setError(err.message || 'Failed to load account details.');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadAccountDetails();

    return () => {
      isMounted = false;
    };
  }, [address]);

  return {
    balance,
    transactionCount,
    loading,
    error,
  };
}

export default useAccountDetails;

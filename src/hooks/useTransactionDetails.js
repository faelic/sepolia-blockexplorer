import { useEffect, useState } from 'react';

import { getTransactionDetails } from '../services/transactionService';

function useTransactionDetails(txHash) {
  const [transaction, setTransaction] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!txHash) {
      return;
    }

    let isMounted = true;

    async function loadTransactionDetails() {
      try {
        setLoading(true);
        setError('');

        const data = await getTransactionDetails(txHash);

        if (!isMounted) {
          return;
        }

        setTransaction(data.transaction);
        setReceipt(data.receipt);
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setError(err.message || 'Failed to load transaction details.');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadTransactionDetails();

    return () => {
      isMounted = false;
    };
  }, [txHash]);

  return {
    transaction,
    receipt,
    loading,
    error,
  };
}

export default useTransactionDetails;

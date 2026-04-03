import { useEffect, useState } from 'react';

import { getBlockDetails } from '../services/blockService';

function useBlockDetails(blockId) {
  const [block, setBlock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!blockId) {
      return;
    }

    let isMounted = true;

    async function loadBlockDetails() {
      try {
        setLoading(true);
        setError('');

        const data = await getBlockDetails(blockId);

        if (!isMounted) {
          return;
        }

        setBlock(data);
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setError(err.message || 'Failed to load block details.');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadBlockDetails();

    return () => {
      isMounted = false;
    };
  }, [blockId]);

  return {
    block,
    loading,
    error,
  };
}

export default useBlockDetails;

import { useEffect, useState } from 'react';

import { getNftMetadata } from '../services/nftService';

function useNftMetadata(contractAddress, tokenId) {
  const [nft, setNft] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!contractAddress || !tokenId) {
      return;
    }

    let isMounted = true;

    async function loadNftMetadata() {
      try {
        setLoading(true);
        setError('');

        const data = await getNftMetadata(contractAddress, tokenId);

        if (!isMounted) {
          return;
        }

        setNft(data);
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setError(err.message || 'Failed to load NFT metadata.');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadNftMetadata();

    return () => {
      isMounted = false;
    };
  }, [contractAddress, tokenId]);

  return {
    nft,
    loading,
    error,
  };
}

export default useNftMetadata;

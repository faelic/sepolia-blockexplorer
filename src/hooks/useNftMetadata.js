import { useEffect, useState } from 'react';

import { getNftMetadata } from '../services/nftService';
import { NFT_ERROR_MESSAGE, getErrorDetail } from '../lib/errorMessages';

function useNftMetadata(contractAddress, tokenId) {
  const [nft, setNft] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errorDetail, setErrorDetail] = useState('');

  useEffect(() => {
    if (!contractAddress || !tokenId) {
      return;
    }

    let isMounted = true;

    async function loadNftMetadata() {
      try {
        setLoading(true);
        setError('');
        setErrorDetail('');

        const data = await getNftMetadata(contractAddress, tokenId);

        if (!isMounted) {
          return;
        }

        setNft(data);
        setErrorDetail('');
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setError(NFT_ERROR_MESSAGE);
        setErrorDetail(getErrorDetail(err));
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
    errorDetail,
  };
}

export default useNftMetadata;

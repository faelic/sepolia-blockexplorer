import { useState } from 'react';

import NftLookupForm from '../components/NftLookupForm';
import NftMetadataCard from '../components/NftMetadataCard';
import useNftMetadata from '../hooks/useNftMetadata';

function NftPage() {
  const [searchValues, setSearchValues] = useState({
    contractAddress: '',
    tokenId: '',
  });

  const { nft, loading, error } = useNftMetadata(
    searchValues.contractAddress,
    searchValues.tokenId
  );

  function handleLookup(contractAddress, tokenId) {
    setSearchValues({
      contractAddress,
      tokenId,
    });
  }

  return (
    <section className="page-section">
      <div className="page-heading">
        <p className="page-heading__eyebrow">NFT</p>
        <h2>NFT metadata lookup</h2>
        <p>
          Search for an NFT by contract address and token ID to inspect its
          metadata.
        </p>
      </div>

      <NftLookupForm onSubmit={handleLookup} />

      {loading ? <p className="page-message">Loading NFT metadata...</p> : null}

      {error ? <p className="page-message page-message--error">{error}</p> : null}

      {!loading && !error && nft ? <NftMetadataCard nft={nft} /> : null}
      {!loading && !error && !nft && searchValues.contractAddress && searchValues.tokenId ? (
        <p className="page-message">No NFT metadata found for that lookup.</p>
      ) : null}
    </section>
  );
}

export default NftPage;

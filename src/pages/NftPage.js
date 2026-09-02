import { useState } from 'react';

import NftLookupForm from '../components/NftLookupForm';
import NftMetadataCard from '../components/NftMetadataCard';
import LoadingState from '../components/LoadingState';
import PageIntro from '../components/PageIntro';
import StatePanel from '../components/StatePanel';
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
    <section className="page-section data-page">
      <PageIntro
        title="NFT metadata lookup"
        description="Inspect ownership metadata, media, and collection details for a Sepolia token."
      />

      <div className="nft-workspace">
        <NftLookupForm onSubmit={handleLookup} />
        <div className="nft-workspace__result" aria-live="polite">
          {loading ? <LoadingState rows={4} label="Loading NFT metadata" /> : null}
          {error ? <StatePanel title="NFT could not be loaded" message={error} tone="error" /> : null}
          {!loading && !error && nft ? <NftMetadataCard nft={nft} /> : null}
          {!loading && !error && !nft && !searchValues.contractAddress ? (
            <StatePanel title="Ready for a token" message="Enter a contract address and token ID to inspect its metadata." />
          ) : null}
          {!loading && !error && !nft && searchValues.contractAddress && searchValues.tokenId ? (
            <StatePanel title="No metadata found" message="Check the contract address and token ID, then try again." />
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default NftPage;

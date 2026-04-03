import { useState } from 'react';

function NftLookupForm({ onSubmit }) {
  const [contractAddress, setContractAddress] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedContractAddress = contractAddress.trim();
    const trimmedTokenId = tokenId.trim();

    if (!trimmedContractAddress || !trimmedTokenId) {
      setError('Enter both a contract address and token ID.');
      return;
    }

    if (!/^0x[a-fA-F0-9]{40}$/.test(trimmedContractAddress)) {
      setError('Enter a valid contract address.');
      return;
    }

    setError('');
    onSubmit(trimmedContractAddress, trimmedTokenId);
  }

  return (
    <section className="nft-form-card">
      <div className="nft-form-card__header">
        <p className="nft-form-card__eyebrow">NFT Lookup</p>
        <h2>Find NFT metadata</h2>
        <p>Enter a contract address and token ID to fetch metadata.</p>
      </div>

      <form className="nft-form" onSubmit={handleSubmit}>
        <label className="nft-form__label" htmlFor="contract-address">
          Contract Address
        </label>
        <input
          id="contract-address"
          className="nft-form__input"
          type="text"
          value={contractAddress}
          onChange={(event) => setContractAddress(event.target.value)}
          placeholder="0x..."
        />

        <label className="nft-form__label" htmlFor="token-id">
          Token ID
        </label>
        <input
          id="token-id"
          className="nft-form__input"
          type="text"
          value={tokenId}
          onChange={(event) => setTokenId(event.target.value)}
          placeholder="e.g. 1"
        />

        <button className="nft-form__button" type="submit">
          Fetch Metadata
        </button>

        {error ? <p className="nft-form__error">{error}</p> : null}
      </form>
    </section>
  );
}

export default NftLookupForm;

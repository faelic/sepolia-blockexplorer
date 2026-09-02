import { useState } from 'react';

import AnimatedAction from './AnimatedAction';
import FieldShell from './FieldShell';
import { SearchIcon } from './icons';

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
        <h2>Find NFT metadata</h2>
        <p>Use the collection contract and exact token ID.</p>
      </div>

      <form className="nft-form" onSubmit={handleSubmit}>
        <FieldShell
          className="field-shell--nft"
          error={error}
          errorId="nft-lookup-error"
          errorClassName="nft-form__error"
        >
          <label className="nft-form__label" htmlFor="contract-address">
            Contract Address
          </label>
          <input
            id="contract-address"
            className="nft-form__input"
            type="text"
            autoComplete="off"
            spellCheck="false"
            value={contractAddress}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? 'nft-lookup-error' : undefined}
            onChange={(event) => {
              setContractAddress(event.target.value);
              if (error) setError('');
            }}
            placeholder="0x1234…"
          />
          <label className="nft-form__label" htmlFor="token-id">
            Token ID
          </label>
          <input
            id="token-id"
            className="nft-form__input"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={tokenId}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? 'nft-lookup-error' : undefined}
            onChange={(event) => {
              setTokenId(event.target.value);
              if (error) setError('');
            }}
            placeholder="1"
          />
          <AnimatedAction
            className="nft-form__button"
            type="submit"
            icon={SearchIcon}
            iconSize={16}
          >
            Fetch Metadata
          </AnimatedAction>
        </FieldShell>
      </form>
    </section>
  );
}

export default NftLookupForm;

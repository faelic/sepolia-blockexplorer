import { useState } from 'react';

import { isExplorerAddress } from '../lib/explorerSearch';
import AnimatedAction from './AnimatedAction';
import FieldShell from './FieldShell';
import { SearchIcon } from './icons';

function AccountLookupForm({ onSubmit }) {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedAddress = address.trim();

    if (!trimmedAddress) {
      setError('Enter a wallet address.');
      return;
    }

    if (!isExplorerAddress(trimmedAddress)) {
      setError('Enter a valid wallet address.');
      return;
    }

    setError('');
    onSubmit(trimmedAddress);
  }

  return (
    <section className="lookup-form-card">
      <div className="lookup-form-card__header">
        <h2>Find an address</h2>
        <p>Use a complete 0x wallet address.</p>
      </div>

      <form className="lookup-form" onSubmit={handleSubmit}>
        <FieldShell
          className="field-shell--lookup"
          error={error}
          errorId="account-address-error"
          errorClassName="lookup-form__error"
        >
          <label className="lookup-form__label" htmlFor="account-address">
            Wallet Address
          </label>
          <input
            id="account-address"
            className="lookup-form__input"
            type="text"
            inputMode="text"
            autoComplete="off"
            spellCheck="false"
            value={address}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? 'account-address-error' : undefined}
            onChange={(event) => {
              setAddress(event.target.value);
              if (error) setError('');
            }}
            placeholder="0x1234…"
          />
          <AnimatedAction
            className="lookup-form__button"
            type="submit"
            icon={SearchIcon}
            iconSize={16}
          >
            View Account
          </AnimatedAction>
        </FieldShell>
      </form>
    </section>
  );
}

export default AccountLookupForm;

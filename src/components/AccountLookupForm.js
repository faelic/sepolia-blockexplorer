import { useState } from 'react';

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

    if (!/^0x[a-fA-F0-9]{40}$/.test(trimmedAddress)) {
      setError('Enter a valid wallet address.');
      return;
    }

    setError('');
    onSubmit(trimmedAddress);
  }

  return (
    <section className="lookup-form-card">
      <div className="lookup-form-card__header">
        <p className="lookup-form-card__eyebrow">Account Lookup</p>
        <h2>Find an address</h2>
        <p>Enter a wallet address to view its balance and transaction count.</p>
      </div>

      <form className="lookup-form" onSubmit={handleSubmit}>
        <label className="lookup-form__label" htmlFor="account-address">
          Wallet Address
        </label>

        <input
          id="account-address"
          className="lookup-form__input"
          type="text"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          placeholder="0x..."
        />

        <button className="lookup-form__button" type="submit">
          View Account
        </button>

        {error ? <p className="lookup-form__error">{error}</p> : null}
      </form>
    </section>
  );
}

export default AccountLookupForm;

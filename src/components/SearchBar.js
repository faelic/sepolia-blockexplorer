import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setError('Enter a block number, transaction hash, or wallet address.');
      return;
    }

    setError('');

    if (/^\d+$/.test(trimmedQuery)) {
      history.push(`/blocks/${trimmedQuery}`);
      return;
    }

    if (/^0x[a-fA-F0-9]{40}$/.test(trimmedQuery)) {
      history.push(`/accounts/${trimmedQuery}`);
      return;
    }

    if (/^0x[a-fA-F0-9]{64}$/.test(trimmedQuery)) {
      history.push(`/tx/${trimmedQuery}`);
      return;
    }

    setError('Input must be a block number, transaction hash, or wallet address.');
  }

  return (
    <section className="search-panel" aria-label="Explorer search">
      <div className="search-panel__header">
        <h2>Explorer Search</h2>
        <p>Search by block number, transaction hash, or wallet address.</p>
      </div>

      <form className="search-form" onSubmit={handleSubmit}>
        <label className="search-form__label" htmlFor="explorer-search">
          Search the explorer
        </label>

        <div className="search-form__controls">
          <input
            id="explorer-search"
            className="search-form__input"
            type="text"
            placeholder="Block number, tx hash, or 0x wallet address"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button className="search-form__button" type="submit">
            Search
          </button>
        </div>

        {error ? <p className="search-form__error">{error}</p> : null}
      </form>
    </section>
  );
}

export default SearchBar;

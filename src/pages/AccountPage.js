import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import AccountLookupForm from '../components/AccountLookupForm';
import StatCard from '../components/StatCard';
import TransfersList from '../components/TransferList';
import useAccountDetails from '../hooks/useAccountDetails';
import useAddressTransfers from '../hooks/useAddressTransfers';
import useWatchlist from '../hooks/useWatchList';
import formatEth from '../utils/formatEth';


function AccountPage() {
  const { address } = useParams();
  const history = useHistory();
  const [watchlistMessage, setWatchlistMessage] = useState({
    text: '',
    type: '',
  });

  const {
    balance,
    transactionCount,
    loading: accountLoading,
    error: accountError,
  } = useAccountDetails(address);

  const {
    transfers,
    loading: transfersLoading,
    error: transfersError,
  } = useAddressTransfers(address);

  const { addToWatchlist } = useWatchlist();

  function handleLookup(submittedAddress) {
    setWatchlistMessage({ text: '', type: '' });
    history.push(`/accounts/${submittedAddress}`);
  }


  function handleSaveToWatchlist() {
    const result = addToWatchlist(address);

    if (result === 'exists') {
      setWatchlistMessage({
        text: 'This address is already in your watchlist.',
        type: 'warning',
      });
      return;
    }

    setWatchlistMessage({
      text: 'Address saved to watchlist.',
      type: 'success',
    });
  }


  return (
    <section className="page-section">
      <div className="page-heading">
        <p className="page-heading__eyebrow">Account</p>
        <h2>Address details</h2>
        <p>
          Look up an address to inspect its balance, nonce, and incoming
          transfer activity on Sepolia.
        </p>
      </div>

      {!address ? <AccountLookupForm onSubmit={handleLookup} /> : null}

      {accountLoading && address ? (
        <p className="page-message">Loading account details...</p>
      ) : null}

      {accountError ? (
        <p className="page-message page-message--error">{accountError}</p>
      ) : null}

      {!accountLoading && !accountError && address ? (
        <>
          <div className="transaction-details">
            <article className="detail-card">
              <p className="detail-card__label">Address</p>
              <h3 className="detail-card__value">{address}</h3>
            </article>
          </div>

          <div className="account-actions">
            <button
              className="account-actions__button"
              type="button"
              onClick={handleSaveToWatchlist}
            >
              Save to Watchlist
            </button>
          </div>

          {watchlistMessage.text ? (
            <p
              className={`watchlist-feedback watchlist-feedback--${watchlistMessage.type}`}
            >
              {watchlistMessage.text}
            </p>
          ) : null}


          <div className="stats-grid">
            <StatCard title="Balance" value={formatEth(balance)} />
            <StatCard title="Nonce" value={transactionCount ?? '0'} />
          </div>
        </>
      ) : null}

      {transfersLoading && address ? (
        <p className="page-message">Loading transfers...</p>
      ) : null}

      {transfersError ? (
        <p className="page-message page-message--error">{transfersError}</p>
      ) : null}

      {!transfersLoading && !transfersError && transfers.length > 0 ? (
        <TransfersList transfers={transfers} />
      ) : null}

      {!transfersLoading && !transfersError && address && transfers.length === 0 ? (
        <p className="page-message">No incoming transfers found for this address.</p>
      ) : null}
    </section>
  );
}

export default AccountPage;


import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import AccountLookupForm from '../components/AccountLookupForm';
import AnimatedAction from '../components/AnimatedAction';
import CopyableValue from '../components/CopyableValue';
import LoadingState from '../components/LoadingState';
import MetricStrip from '../components/MetricStrip';
import PageIntro from '../components/PageIntro';
import ResultContent from '../components/ResultContent';
import ResultHeader from '../components/ResultHeader';
import ResultSkeleton from '../components/ResultSkeleton';
import ResultState from '../components/ResultState';
import StatePanel from '../components/StatePanel';
import TransfersList from '../components/TransferList';
import { BookmarkPlusIcon } from '../components/icons';
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
    errorType: accountErrorType,
    retry: retryAccount,
  } = useAccountDetails(address);

  const {
    transfers,
    loading: transfersLoading,
    error: transfersError,
    retry: retryTransfers,
  } = useAddressTransfers(address);

  const { addToWatchlist } = useWatchlist();
  const resultState = accountLoading
    ? 'loading'
    : accountError
      ? accountErrorType
      : 'ready';

  function handleLookup(submittedAddress) {
    setWatchlistMessage({ text: '', type: '' });
    history.push(`/accounts/${submittedAddress}`, {
      explorerQuery: submittedAddress,
      explorerSearchType: 'address',
      source: 'account-lookup',
    });
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
    <section className="page-section data-page">
      {address ? (
        <ResultHeader
          type="Address"
          identifier={address}
          description="Balance, nonce, and incoming activity for this Sepolia address."
        />
      ) : (
        <PageIntro
          title="Find an account"
          description="Enter a Sepolia wallet address to inspect its current onchain activity."
        />
      )}

      {!address ? <AccountLookupForm onSubmit={handleLookup} /> : null}

      {address ? (
        <ResultContent identity={address} state={resultState}>
          {accountLoading ? (
            <ResultSkeleton rows={3} label="Loading address details" />
          ) : null}

          {accountError ? (
            <ResultState
              kind={accountErrorType}
              type="Address"
              onRetry={retryAccount}
            />
          ) : null}

          {!accountLoading && !accountError ? (
            <>
              <div className="identity-bar">
                <div>
                  <span>Wallet address</span>
                  <CopyableValue value={address} label="wallet address" />
                </div>
                <AnimatedAction
                  className="secondary-action"
                  type="button"
                  icon={BookmarkPlusIcon}
                  iconSize={16}
                  onClick={handleSaveToWatchlist}
                >
                  Save to Watchlist
                </AnimatedAction>
              </div>

              {watchlistMessage.text ? (
                <p
                  className={`watchlist-feedback watchlist-feedback--${watchlistMessage.type}`}
                >
                  {watchlistMessage.text}
                </p>
              ) : null}
              <MetricStrip label="Account summary" items={[
                { label: 'Balance', value: formatEth(balance), note: 'Sepolia ETH' },
                { label: 'Nonce', value: transactionCount ?? '0', note: 'Transactions sent' },
                { label: 'Incoming transfers', value: transfersLoading ? 'Loading' : transfers.length },
              ]} />

              {transfersLoading ? <LoadingState rows={3} label="Loading transfers" /> : null}

              {transfersError ? (
                <StatePanel
                  title="Transfers could not be loaded"
                  message={transfersError}
                  tone="error"
                  action={{ label: 'Retry transfers', onClick: retryTransfers }}
                />
              ) : null}

              {!transfersLoading && !transfersError && transfers.length > 0 ? (
                <TransfersList transfers={transfers} />
              ) : null}

              {!transfersLoading && !transfersError && transfers.length === 0 ? (
                <StatePanel title="No incoming transfers" message="This address has no incoming transfer activity in the current result window." />
              ) : null}
            </>
          ) : null}
        </ResultContent>
      ) : null}
    </section>
  );
}

export default AccountPage;

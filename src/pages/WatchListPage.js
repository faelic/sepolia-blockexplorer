import { useState } from 'react';

import Watchlist from '../components/Watchlist';
import PageIntro from '../components/PageIntro';
import StatePanel from '../components/StatePanel';
import ConfirmDialog from '../components/ConfirmDialog';
import { useToast } from '../components/ToastProvider';
import useWatchlist from '../hooks/useWatchList';
import truncateValue from '../utils/truncateHash';

function WatchlistPage() {
  const [pendingRemoval, setPendingRemoval] = useState(null);
  const { watchlist, removeFromWatchlist, insertIntoWatchlist } = useWatchlist();
  const { showToast, updateToast } = useToast();

  function confirmRemoval() {
    if (!pendingRemoval) return;
    const { address, originalIndex } = pendingRemoval;
    removeFromWatchlist(address);
    setPendingRemoval(null);

    showToast({
      status: 'success',
      title: 'Wallet removed',
      description: `${truncateValue(address, 8, 6)} was removed from Saved wallets.`,
      duration: 8000,
      action: {
        label: 'Undo',
        onClick: (toastId) => {
          insertIntoWatchlist(address, originalIndex);
          updateToast(toastId, {
            status: 'success',
            title: 'Wallet restored',
            description: `${truncateValue(address, 8, 6)} is back in Saved wallets.`,
            action: null,
            duration: 3200,
          });
        },
      },
    });
  }

  return (
    <section className="page-section data-page">
      <PageIntro
        title="Saved wallets"
        description="A local shortlist of Sepolia accounts you want to revisit quickly."
      />

      {watchlist.length > 0 ? (
        <Watchlist addresses={watchlist} onRequestRemove={setPendingRemoval} />
      ) : (
        <StatePanel
          title="Your watchlist is empty"
          message="Look up an account and save it here for quick access."
          action={{ label: 'Find an account', to: '/accounts' }}
        />
      )}

      <ConfirmDialog
        open={Boolean(pendingRemoval)}
        eyebrow="Saved wallet"
        title="Remove this wallet?"
        description={pendingRemoval ? (
          <p>
            This removes <code title={pendingRemoval.address}>{truncateValue(pendingRemoval.address, 10, 8)}</code> from wallets saved in this browser. It does not affect the wallet or its onchain activity.
          </p>
        ) : null}
        cancelLabel="Cancel"
        confirmLabel="Remove wallet"
        onCancel={() => setPendingRemoval(null)}
        onConfirm={confirmRemoval}
        returnFocus={pendingRemoval?.triggerElement}
      />
    </section>
  );
}

export default WatchlistPage;

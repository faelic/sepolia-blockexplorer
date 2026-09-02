import Watchlist from '../components/Watchlist';
import PageIntro from '../components/PageIntro';
import StatePanel from '../components/StatePanel';
import useWatchlist from '../hooks/useWatchList';

function WatchlistPage() {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  return (
    <section className="page-section data-page">
      <PageIntro
        title="Saved wallets"
        description="A local shortlist of Sepolia accounts you want to revisit quickly."
      />

      {watchlist.length > 0 ? (
        <Watchlist addresses={watchlist} onRemove={removeFromWatchlist} />
      ) : (
        <StatePanel
          title="Your watchlist is empty"
          message="Look up an account and save it here for quick access."
          action={{ label: 'Find an account', to: '/accounts' }}
        />
      )}
    </section>
  );
}

export default WatchlistPage;

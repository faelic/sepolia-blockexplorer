import Watchlist from '../components/Watchlist';
import useWatchlist from '../hooks/useWatchList';

function WatchlistPage() {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  return (
    <section className="page-section">
      <div className="page-heading">
        <p className="page-heading__eyebrow">Watchlist</p>
        <h2>Saved wallets</h2>
        <p>
          View and manage wallet addresses you have saved for quick access.
        </p>
      </div>

      {watchlist.length > 0 ? (
        <Watchlist addresses={watchlist} onRemove={removeFromWatchlist} />
      ) : (
        <p className="page-message">
          No saved wallets yet. Save an address from the account page to add it
          here.
        </p>
      )}
    </section>
  );
}

export default WatchlistPage;

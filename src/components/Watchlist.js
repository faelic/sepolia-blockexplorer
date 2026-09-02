import WatchlistItem from './WatchlistItem';

function Watchlist({ addresses, onRemove }) {
  return (
    <section className="watchlist">
      <div className="data-section-heading">
        <div>
          <h2>Wallet watchlist</h2>
          <p>Saved in this browser</p>
        </div>
        <span>{addresses.length} wallets</span>
      </div>

      <div className="data-list watchlist__items">
        {addresses.map((address) => (
          <WatchlistItem key={address} address={address} onRemove={onRemove} />
        ))}
      </div>
    </section>
  );
}

export default Watchlist;

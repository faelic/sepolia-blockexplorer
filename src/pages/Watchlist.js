import WatchlistItem from './WatchlistItem';

function Watchlist({ addresses, onRemove }) {
  return (
    <section className="watchlist">
      <div className="watchlist__header">
        <p className="watchlist__eyebrow">Wallet Watchlist</p>
        <h2>Saved wallets</h2>
      </div>

      <div className="watchlist__items">
        {addresses.map((address) => (
          <WatchlistItem key={address} address={address} onRemove={onRemove} />
        ))}
      </div>
    </section>
  );
}

export default Watchlist;

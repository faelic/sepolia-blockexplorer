import WatchlistItem from './WatchlistItem';
import { AnimatePresence } from 'motion/react';

function Watchlist({ addresses, onRequestRemove }) {
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
        <AnimatePresence>
          {addresses.map((address, index) => (
            <WatchlistItem
              key={address}
              address={address}
              index={index}
              onRequestRemove={onRequestRemove}
            />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Watchlist;

import { Link } from 'react-router-dom';
import truncateValue from '../utils/truncateHash';

function WatchlistItem({ address, onRemove }) {
  return (
    <article className="watchlist-item">
      <div className="watchlist-item__content">
        <p className="watchlist-item__label">Saved Wallet</p>
        <h3 className="watchlist-item__value">{truncateValue(address, 10, 8)}</h3>
        <p className="watchlist-item__full">{address}</p>
      </div>

      <div className="watchlist-item__actions">
        <Link className="watchlist-item__link" to={`/accounts/${address}`}>
          View
        </Link>
        <button
          className="watchlist-item__button"
          type="button"
          onClick={() => onRemove(address)}
        >
          Remove
        </button>
      </div>
    </article>
  );
}

export default WatchlistItem;

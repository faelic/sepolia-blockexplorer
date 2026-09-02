import { Link } from 'react-router-dom';

import AnimatedAction from './AnimatedAction';
import CopyableValue from './CopyableValue';
import { ArrowRightIcon, BookmarkXIcon } from './icons';

function WatchlistItem({ address, onRemove }) {
  return (
    <article className="watchlist-item">
      <div className="watchlist-item__content">
        <span>Sepolia wallet</span>
        <CopyableValue value={address} label="wallet address" />
      </div>

      <div className="watchlist-item__actions">
        <AnimatedAction
          as={Link}
          className="watchlist-item__link"
          to={`/accounts/${address}`}
          icon={ArrowRightIcon}
          iconPosition="end"
          iconSize={15}
        >
          Open account
        </AnimatedAction>
        <AnimatedAction
          className="watchlist-item__button"
          type="button"
          icon={BookmarkXIcon}
          iconSize={15}
          onClick={() => onRemove(address)}
        >
          Remove
        </AnimatedAction>
      </div>
    </article>
  );
}

export default WatchlistItem;

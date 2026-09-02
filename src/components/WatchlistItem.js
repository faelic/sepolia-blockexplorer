import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';

import AnimatedAction from './AnimatedAction';
import CopyableValue from './CopyableValue';
import { ArrowRightIcon, BookmarkXIcon } from './icons';

function WatchlistItem({ address, index, onRequestRemove }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      layout
      className="watchlist-item"
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
      transition={{ duration: reducedMotion ? 0.12 : 0.22 }}
    >
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
          onClick={(event) => onRequestRemove({
            address,
            originalIndex: index,
            triggerElement: event.currentTarget,
          })}
        >
          Remove
        </AnimatedAction>
      </div>
    </motion.article>
  );
}

export default WatchlistItem;

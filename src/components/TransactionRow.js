import { Link } from 'react-router-dom';

import AnimatedAction from './AnimatedAction';
import { ArrowRightIcon } from './icons';
import truncateValue from '../utils/truncateHash';

function TransactionRow({ transaction }) {
  return (
    <AnimatedAction
      as={Link}
      className="transaction-row"
      to={`/tx/${transaction.hash}`}
      icon={ArrowRightIcon}
      iconClassName="row-action-icon"
      iconPosition="end"
      iconSize={16}
    >
      <code>{truncateValue(transaction.hash, 12, 8)}</code>
      <code data-label="From">{truncateValue(transaction.from)}</code>
      <code data-label="To">{transaction.to ? truncateValue(transaction.to) : 'Contract creation'}</code>
    </AnimatedAction>
  );
}

export default TransactionRow;

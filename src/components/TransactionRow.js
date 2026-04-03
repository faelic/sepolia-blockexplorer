import { Link } from 'react-router-dom';
import truncateValue from '../utils/truncateHash';

function TransactionRow({ transaction }) {
  return (
    <Link className="transaction-row" to={`/tx/${transaction.hash}`}>
      <div className="transaction-row__main">
        <p className="transaction-row__label">Transaction Hash</p>
        <h3 className="transaction-row__value">{truncateValue(transaction.hash, 12, 8)}</h3>
      </div>

      <div className="transaction-row__meta">
        <p>From: {truncateValue(transaction.from)}</p>
        <p>To: {transaction.to ? truncateValue(transaction.to) : 'Contract Creation'}</p>
      </div>
    </Link>
  );
}

export default TransactionRow;

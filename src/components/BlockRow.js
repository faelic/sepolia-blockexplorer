import { Link } from 'react-router-dom';
import formatTimestamp from '../utils/FormatTimestamp';
import truncateValue from '../utils/truncateHash';


function BlockRow({ block }) {
  return (
    <Link className="block-row" to={`/blocks/${block.number}`}>
      <div className="block-row__main">
        <p className="block-row__label">Block</p>
        <h3 className="block-row__value">{block.number}</h3>
      </div>

      <div className="block-row__meta">
        <p>Transactions: {block.transactions.length}</p>
        <p>Miner: {truncateValue(block.miner)}</p>
        <p>Timestamp: {formatTimestamp(block.timestamp)}</p>
      </div>
    </Link>
  );
}

export default BlockRow;

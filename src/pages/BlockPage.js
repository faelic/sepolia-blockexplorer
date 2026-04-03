import { useParams } from 'react-router-dom';

import StatCard from '../components/StatCard';
import TransactionList from '../components/TransactionList';
import useBlockDetails from '../hooks/useBlockDetails';
import truncateValue from '../utils/truncateHash.js';
import formatTimestamp from '../utils/FormatTimestamp';

function BlockPage() {
  const { blockId } = useParams();
  const { block, loading, error } = useBlockDetails(blockId);

  return (
    <section className="page-section">
      <div className="page-heading">
        <p className="page-heading__eyebrow">Block</p>
        <h2>Block {blockId}</h2>
        <p>
          Inspect block details and review the transactions included in this
          block.
        </p>
      </div>

      {loading ? <p className="page-message">Loading block details...</p> : null}

      {error ? <p className="page-message page-message--error">{error}</p> : null}

      {!loading && !error && block ? (
        <>
          <div className="stats-grid">
            <StatCard title="Block Number" value={block.number} note="Sepolia" />
            <StatCard title="Transactions" value={block.transactions.length} />
            <StatCard
              title="Timestamp"
              value={formatTimestamp(block.timestamp)}
            />
            <StatCard
              title="Miner"
              value={truncateValue(block.miner)}
            />
          </div>

          <div className="stats-grid">
            <StatCard title="Gas Used" value={block.gasUsed.toString()} />
            <StatCard title="Gas Limit" value={block.gasLimit.toString()} />
            <StatCard
              title="Block Hash"
              value={truncateValue(block.hash)}
              note="Showing shortened hash"
            />
          </div>

          <p className="section-note">Showing the first 10 transactions in this block.</p>
          <TransactionList transactions={block.transactions.slice(0, 10)} />
        </>
      ) : null}
    </section>
  );
}

export default BlockPage;

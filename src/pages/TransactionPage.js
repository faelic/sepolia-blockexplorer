import { useParams } from 'react-router-dom';

import StatCard from '../components/StatCard';
import useTransactionDetails from '../hooks/useTransactionDetails';
import formatEth from '../utils/formatEth';
import truncateValue from '../utils/truncateHash';

function TransactionPage() {
  const { txHash } = useParams();
  const { transaction, receipt, loading, error } = useTransactionDetails(txHash);

  return (
    <section className="page-section">
      <div className="page-heading">
        <p className="page-heading__eyebrow">Transaction</p>
        <h2>Transaction details</h2>
        <p>
          Review the transaction payload, network status, and receipt
          information.
        </p>
      </div>

      {loading ? (
        <p className="page-message">Loading transaction details...</p>
      ) : null}

      {error ? <p className="page-message page-message--error">{error}</p> : null}

        {!loading && !error && transaction ? (
        <>
          <div className="status-banner">
            <p className="status-banner__label">Transaction Status</p>
            <h2 className="status-banner__value">
              {!receipt
                ? 'Pending'
                : receipt.status === 1
                ? 'Mined - Success'
                : 'Mined - Failed'}
            </h2>
            <p className="status-banner__note">
              {!receipt
                ? 'This transaction exists but has not been mined yet.'
                : `Included in block ${receipt.blockNumber}.`}
            </p>
          </div>

          <div className="stats-grid">
            <StatCard
              title="Block Number"
              value={receipt ? receipt.blockNumber : 'Pending'}
            />
            <StatCard
              title="Status"
              value={!receipt ? 'Pending' : receipt.status === 1 ? 'Success' : 'Failed'}
            />
            <StatCard title="Nonce" value={transaction.nonce} />
          </div>

          <div className="transaction-details">
            <article className="detail-card">
              <p className="detail-card__label">Transaction Hash</p>
              <h3 className="detail-card__value">{transaction.hash}</h3>
              <p className="detail-card__hint">{truncateValue(transaction.hash, 10, 8)}</p>
            </article>

            <article className="detail-card">
              <p className="detail-card__label">From</p>
              <h3 className="detail-card__value">{transaction.from}</h3>
            </article>

            <article className="detail-card">
              <p className="detail-card__label">To</p>
              <h3 className="detail-card__value">
                {transaction.to || 'Contract Creation'}
              </h3>
            </article>

            <article className="detail-card">
              <p className="detail-card__label">Value</p>
              <h3 className="detail-card__value">{formatEth(transaction.value)}</h3>
            </article>

            <article className="detail-card">
              <p className="detail-card__label">Gas Limit</p>
              <h3 className="detail-card__value">
                {transaction.gasLimit.toString()}
              </h3>
            </article>

            <article className="detail-card">
              <p className="detail-card__label">Gas Price</p>
              <h3 className="detail-card__value">
                {transaction.gasPrice ? transaction.gasPrice.toString() : 'Not available'}
              </h3>
            </article>

            <article className="detail-card">
              <p className="detail-card__label">Gas Used</p>
              <h3 className="detail-card__value">
                {receipt ? receipt.gasUsed.toString() : 'Pending'}
              </h3>
            </article>
          </div>
        </>
      ) : null}


    </section>
  );
}

export default TransactionPage;

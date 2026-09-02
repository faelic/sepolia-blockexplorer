import { Link, useParams } from 'react-router-dom';

import AnimatedAction from '../components/AnimatedAction';
import CopyableValue from '../components/CopyableValue';
import MetricStrip from '../components/MetricStrip';
import ResultContent from '../components/ResultContent';
import ResultHeader from '../components/ResultHeader';
import ResultSkeleton from '../components/ResultSkeleton';
import ResultState from '../components/ResultState';
import { ArrowRightIcon } from '../components/icons';
import useTransactionDetails from '../hooks/useTransactionDetails';
import formatEth from '../utils/formatEth';
import truncateValue from '../utils/truncateHash';

function TransactionPage() {
  const { txHash } = useParams();
  const {
    transaction,
    receipt,
    loading,
    error,
    errorType,
    retry,
  } = useTransactionDetails(txHash);
  const resultState = loading ? 'loading' : error ? errorType : 'ready';

  return (
    <section className="page-section data-page">
      <ResultHeader
        type="Transaction"
        identifier={txHash}
        description="Execution status, participants, value, and gas usage on Sepolia."
      />

      <ResultContent identity={txHash} state={resultState}>
        {loading ? (
          <ResultSkeleton lead rows={4} label="Loading transaction details" />
        ) : null}
        {error ? (
          <ResultState kind={errorType} type="Transaction" onRetry={retry} />
        ) : null}

        {!loading && !error && transaction ? (
          <>
            <section className={`status-banner status-banner--${!receipt ? 'pending' : receipt.status === 1 ? 'success' : 'failed'}`}>
              <span className="status-banner__indicator" aria-hidden="true" />
              <div>
                <p className="status-banner__label">Transaction status</p>
                <h2 className="status-banner__value">
                {!receipt
                  ? 'Pending'
                  : receipt.status === 1
                  ? 'Mined successfully'
                  : 'Execution failed'}
                </h2>
                <p className="status-banner__note">
                  {!receipt ? 'Waiting for block inclusion.' : `Included in block ${receipt.blockNumber}.`}
                </p>
              </div>
            </section>

            <section className="transaction-flow" aria-label="Transaction value path">
              <div className="transaction-flow__node">
                <span>From</span>
                <Link to={`/accounts/${transaction.from}`}>
                  <code title={transaction.from}>{truncateValue(transaction.from, 10, 8)}</code>
                </Link>
              </div>
              <div className="transaction-flow__spine" aria-hidden="true">
                <i />
                <span>{formatEth(transaction.value)}</span>
                <i />
              </div>
              <div className="transaction-flow__node transaction-flow__node--destination">
                <span>{transaction.to ? 'To' : 'Creates'}</span>
                {transaction.to ? (
                  <Link to={`/accounts/${transaction.to}`}>
                    <code title={transaction.to}>{truncateValue(transaction.to, 10, 8)}</code>
                  </Link>
                ) : <code>Contract</code>}
              </div>
            </section>

            <MetricStrip label="Transaction summary" items={[
              { label: 'Block', value: receipt ? <Link to={`/blocks/${receipt.blockNumber}`}>{receipt.blockNumber}</Link> : 'Pending' },
              { label: 'Status', value: !receipt ? 'Pending' : receipt.status === 1 ? 'Success' : 'Failed' },
              { label: 'Value', value: formatEth(transaction.value) },
              { label: 'Gas used', value: receipt ? receipt.gasUsed.toString() : 'Pending' },
            ]} />

            <dl className="detail-list" aria-label="Transaction details">
              <div><dt>Transaction hash</dt><dd><CopyableValue value={transaction.hash} label="transaction hash" /></dd></div>
              <div>
                <dt>From</dt>
                <dd>
                  <CopyableValue value={transaction.from} label="sender address" />
                  <AnimatedAction
                    as={Link}
                    className="detail-list__link"
                    to={`/accounts/${transaction.from}`}
                    icon={ArrowRightIcon}
                    iconPosition="end"
                    iconSize={13}
                  >
                    Open account
                  </AnimatedAction>
                </dd>
              </div>
              <div>
                <dt>To</dt>
                <dd>
                  {transaction.to ? (
                    <>
                      <CopyableValue value={transaction.to} label="recipient address" />
                      <AnimatedAction
                        as={Link}
                        className="detail-list__link"
                        to={`/accounts/${transaction.to}`}
                        icon={ArrowRightIcon}
                        iconPosition="end"
                        iconSize={13}
                      >
                        Open account
                      </AnimatedAction>
                    </>
                  ) : 'Contract creation'}
                </dd>
              </div>
              <div><dt>Gas limit</dt><dd>{transaction.gasLimit.toString()}</dd></div>
              <div><dt>Gas price</dt><dd>{transaction.gasPrice ? transaction.gasPrice.toString() : 'Not available'}</dd></div>
              <div><dt>Gas used</dt><dd>{receipt ? receipt.gasUsed.toString() : 'Pending'}</dd></div>
            </dl>
          </>
        ) : null}
      </ResultContent>
    </section>
  );
}

export default TransactionPage;

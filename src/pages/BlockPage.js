import { Link, useParams } from 'react-router-dom';

import AnimatedAction from '../components/AnimatedAction';
import CopyableValue from '../components/CopyableValue';
import MetricStrip from '../components/MetricStrip';
import ResultContent from '../components/ResultContent';
import ResultHeader from '../components/ResultHeader';
import ResultSkeleton from '../components/ResultSkeleton';
import ResultState from '../components/ResultState';
import TransactionList from '../components/TransactionList';
import { ArrowRightIcon } from '../components/icons';
import useBlockDetails from '../hooks/useBlockDetails';
import formatTimestamp from '../utils/FormatTimestamp';

function BlockPage() {
  const { blockId } = useParams();
  const {
    block,
    loading,
    error,
    errorDetail,
    errorType,
    retry,
  } = useBlockDetails(blockId);
  const resultState = loading ? 'loading' : error ? errorType : 'ready';
  const parsedBlockId = Number(blockId);
  const previousBlock = Number.isInteger(parsedBlockId) && parsedBlockId > 0
    ? parsedBlockId - 1
    : null;
  const nextBlock = Number.isInteger(parsedBlockId) ? parsedBlockId + 1 : null;

  return (
    <section className="page-section data-page">
      <ResultHeader
        type="Block"
        identifier={`#${blockId}`}
        description="Block summary, gas usage, and included transactions on Sepolia."
      />

      {Number.isInteger(parsedBlockId) ? (
        <nav className="block-neighbours" aria-label="Adjacent blocks">
          {previousBlock !== null ? (
            <AnimatedAction
              as={Link}
              className="block-neighbours__link block-neighbours__link--previous"
              to={`/blocks/${previousBlock}`}
              icon={ArrowRightIcon}
              iconSize={14}
            >
              <span>Previous</span>
              <code>#{previousBlock}</code>
            </AnimatedAction>
          ) : <span />}
          <span className="block-neighbours__position">Chain position</span>
          <AnimatedAction
            as={Link}
            className="block-neighbours__link"
            to={`/blocks/${nextBlock}`}
            icon={ArrowRightIcon}
            iconPosition="end"
            iconSize={14}
          >
            <span>Next</span>
            <code>#{nextBlock}</code>
          </AnimatedAction>
        </nav>
      ) : null}

      <ResultContent identity={blockId} state={resultState}>
        {loading ? <ResultSkeleton rows={4} label="Loading block details" /> : null}
        {error ? (
          <ResultState kind={errorType} type="Block" onRetry={retry} detail={errorDetail} />
        ) : null}

        {!loading && !error && block ? (
          <>
            <MetricStrip
              label="Block summary"
              items={[
                { label: 'Block number', value: block.number },
                { label: 'Transactions', value: block.transactions.length },
                { label: 'Timestamp', value: formatTimestamp(block.timestamp) },
                {
                  label: 'Gas utilization',
                  value: `${Math.round((Number(block.gasUsed.toString()) / Number(block.gasLimit.toString())) * 100)}%`,
                },
              ]}
            />

            <dl className="detail-list" aria-label="Block details">
              <div><dt>Miner</dt><dd><CopyableValue value={block.miner} label="miner address" /></dd></div>
              <div><dt>Gas used</dt><dd>{block.gasUsed.toString()}</dd></div>
              <div><dt>Gas limit</dt><dd>{block.gasLimit.toString()}</dd></div>
              <div><dt>Block hash</dt><dd><CopyableValue value={block.hash} label="block hash" /></dd></div>
            </dl>

            <TransactionList transactions={block.transactions.slice(0, 10)} />
          </>
        ) : null}
      </ResultContent>
    </section>
  );
}

export default BlockPage;

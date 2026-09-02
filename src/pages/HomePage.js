import BlockList from '../components/BlockList';
import LoadingState from '../components/LoadingState';
import MetricStrip from '../components/MetricStrip';
import PageIntro from '../components/PageIntro';
import StatePanel from '../components/StatePanel';
import HomeSearchHero from '../features/homeHero/HomeSearchHero';
import useRecentBlocks from '../hooks/useRecentBlocks';
import formatTimestamp from '../utils/FormatTimestamp';

function HomePage() {
  const { latestBlockNumber, blocks, loading, error } = useRecentBlocks();
  const transactionCount = blocks.reduce(
    (total, block) => total + (block.transactions?.length || 0),
    0,
  );
  return (
    <>
      <HomeSearchHero />
      <section
        className="home-activity"
        id="network-activity"
      >
        <PageIntro
          headingLevel={2}
          title="Sepolia, in sequence."
          description="Follow the newest blocks as they arrive, then open any block to inspect the transactions it contains."
        />

        {loading ? <LoadingState rows={5} label="Loading recent blocks" /> : null}
        {error ? (
          <StatePanel
            title="Network activity is unavailable"
            message={error}
            tone="error"
          />
        ) : null}

        {!loading && !error && blocks.length > 0 ? (
          <>
            <MetricStrip
              label="Sepolia network snapshot"
              items={[
                { label: 'Latest block', value: latestBlockNumber },
                { label: 'Transactions sampled', value: transactionCount },
                { label: 'Last block', value: formatTimestamp(blocks[0].timestamp) },
              ]}
            />
            <BlockList blocks={blocks} />
          </>
        ) : null}

        {!loading && !error && blocks.length === 0 ? (
          <StatePanel
            title="No recent blocks"
            message="Sepolia has not returned recent block activity yet."
          />
        ) : null}
      </section>
    </>
  );
}

export default HomePage;

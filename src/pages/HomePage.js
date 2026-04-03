import BlockList from '../components/BlockList';
import StatCard from '../components/StatCard';
import useRecentBlocks from '../hooks/useRecentBlocks';


function HomePage() {
  const { latestBlockNumber, blocks, loading, error } = useRecentBlocks();

  return (
    <section className="page-section">
      <div className="page-heading">
        <p className="page-heading__eyebrow">Home</p>
        <h2>Sepolia block activity</h2>
        <p>
          Track the latest block number and inspect the most recent blocks on the
          network.
        </p>
      </div>

      {loading ? (
        <p className="page-message">Loading recent blocks...</p>
      ) : null}

      {error ? <p className="page-message page-message--error">{error}</p> : null}

      {!loading && !error ? (
        blocks.length > 0 ? (
          <>
            <StatCard
              title="Latest Block"
              value={latestBlockNumber}
              note="Live from Sepolia"
            />

            <BlockList blocks={blocks} />
          </>
        ) : (
          <p className="page-message">No recent blocks available right now.</p>
        )
      ) : null}
    </section>
  );
}

export default HomePage;

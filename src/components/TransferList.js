import TransferRow from './TransferRow';

function TransfersList({ transfers }) {
  return (
    <section className="transfers-list">
      <div className="data-section-heading">
        <div>
          <h2>Incoming transfers</h2>
          <p>Recent account activity</p>
        </div>
        <span>{transfers.length} results</span>
      </div>

      <div className="data-list transfers-list__items">
        <div className="data-list__columns data-list__columns--transfers" aria-hidden="true">
          <span>Transaction</span><span>From</span><span>Asset</span><span>Value</span><span>Age</span><span />
        </div>
        {transfers.map((transfer) => (
          <TransferRow
            key={`${transfer.hash}-${transfer.uniqueId || transfer.asset || transfer.from}`}
            transfer={transfer}
          />
        ))}
      </div>
    </section>
  );
}

export default TransfersList;

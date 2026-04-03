import TransferRow from './TransferRow';

function TransfersList({ transfers }) {
  return (
    <section className="transfers-list">
      <div className="transfers-list__header">
        <p className="transfers-list__eyebrow">Recent Transfers</p>
        <h2>Incoming transfer activity</h2>
      </div>

      <div className="transfers-list__items">
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

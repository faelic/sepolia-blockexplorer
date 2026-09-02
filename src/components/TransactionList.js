import TransactionRow from './TransactionRow';

function TransactionList({ transactions }) {
  return (
    <section className="transaction-list">
      <div className="data-section-heading">
        <div>
          <h2>Transactions</h2>
          <p>First 10 included in this block</p>
        </div>
        <span>{transactions.length} results</span>
      </div>

      <div className="data-list transaction-list__items">
        <div className="data-list__columns data-list__columns--transactions" aria-hidden="true">
          <span>Transaction</span><span>From</span><span>To</span><span />
        </div>
        {transactions.map((transaction) => (
          <TransactionRow key={transaction.hash} transaction={transaction} />
        ))}
      </div>
    </section>
  );
}

export default TransactionList;

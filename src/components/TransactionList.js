import TransactionRow from './TransactionRow';

function TransactionList({ transactions }) {
  return (
    <section className="transaction-list">
      <div className="transaction-list__header">
        <p className="transaction-list__eyebrow">Transactions</p>
        <h2>Latest transactions</h2>
      </div>

      <div className="transaction-list__items">
        {transactions.map((transaction) => (
          <TransactionRow key={transaction.hash} transaction={transaction} />
        ))}
      </div>
    </section>
  );
}

export default TransactionList;

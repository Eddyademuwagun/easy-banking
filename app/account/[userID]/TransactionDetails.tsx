export default function TransactionDetails({ transactions }) {
  return (
    <div>
      <h1>Transactions</h1>

      {transactions.map((transaction) => (
        <div key={transaction.id}>
          <p>
            <strong>sender:</strong> {transaction.sendername}
          </p>
          <p>
            <strong>receiver:</strong> {transaction.receivername}
          </p>
          <p>
            <strong>amount:</strong> {transaction.amount}
          </p>
          <p>
            <strong>date:</strong>{' '}
            {new Date(transaction.createdAt).toLocaleString()}
          </p>
          <hr />
        </div>
      ))}
    </div>
  );
}

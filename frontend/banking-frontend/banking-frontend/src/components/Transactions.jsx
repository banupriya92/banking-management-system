function Transactions({ account, transactions }) {
  if (!account) {
    return (
      <section className="panel">
        <h3>Transactions</h3>
        <p className="muted">Create an account first to view its transactions.</p>
      </section>
    )
  }

  return (
    <section className="panel">
      <h3>Transactions - {account.accountNumber}</h3>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Date</th><th>Type</th><th>Amount</th><th>Description</th></tr></thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr><td colSpan="4">No transactions found</td></tr>
            ) : transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{new Date(transaction.transactionDate).toLocaleString()}</td>
                <td><span className="badge">{transaction.type}</span></td>
                <td>₹{Number(transaction.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                <td>{transaction.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Transactions

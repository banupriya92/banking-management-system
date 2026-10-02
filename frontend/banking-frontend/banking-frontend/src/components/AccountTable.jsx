function AccountTable({ accounts, onTransactions }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr><th>Account</th><th>Customer</th><th>Type</th><th>Balance</th><th></th></tr>
        </thead>
        <tbody>
          {accounts.map(account => (
            <tr key={account.id}>
              <td>{account.accountNumber}</td>
              <td>{account.customer?.name}</td>
              <td><span className="badge">{account.accountType}</span></td>
              <td>₹{Number(account.balance).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
              <td><button className="linkbtn" onClick={() => onTransactions(account)}>Transactions</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AccountTable

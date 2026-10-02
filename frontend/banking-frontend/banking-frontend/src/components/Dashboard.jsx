import { useMemo } from 'react'
import AccountTable from './AccountTable'

function Dashboard({ accounts, customers, onTransactions }) {
  const total = useMemo(
    () => accounts.reduce((sum, account) => sum + Number(account.balance || 0), 0),
    [accounts]
  )

  return (
    <>
      <div className="cards">
        <div className="card"><span>Customers</span><strong>{customers.length}</strong><small>Registered customers</small></div>
        <div className="card"><span>Accounts</span><strong>{accounts.length}</strong><small>Active accounts</small></div>
        <div className="card"><span>Total Balance</span><strong>₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong><small>Across all accounts</small></div>
      </div>
      <section className="panel">
        <div className="panel-title"><h3>Account Overview</h3></div>
        <AccountTable accounts={accounts} onTransactions={onTransactions} />
      </section>
    </>
  )
}

export default Dashboard

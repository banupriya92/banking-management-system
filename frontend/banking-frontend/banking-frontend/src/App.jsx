import { useEffect, useState } from 'react'
import { api } from './api'
import Accounts from './components/Accounts'
import Customers from './components/Customers'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import OperationForm from './components/OperationForm'
import OperationIcon from './components/OperationIcon'
import Transactions from './components/Transactions'

function App() {
  const [user, setUser] = useState(localStorage.getItem('bankUser'))
  const [page, setPage] = useState('dashboard')
  const [operationsOpen, setOperationsOpen] = useState(true)
  const [accounts, setAccounts] = useState([])
  const [customers, setCustomers] = useState([])
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const load = async () => {
    try {
      const [accountData, customerData] = await Promise.all([api.accounts(), api.customers()])
      setAccounts(accountData)
      setCustomers(customerData)
    } catch (loadError) {
      setError(loadError.message)
    }
  }

  useEffect(() => {
    if (user) load()
  }, [user])

  const logout = () => {
    localStorage.removeItem('bankUser')
    setUser(null)
  }

  const refresh = async () => {
    await load()
    if (selectedAccount) {
      const transactionData = await api.transactions(selectedAccount.id)
      setTransactions(transactionData)
    }
  }

  const openTransactions = async (account) => {
    setSelectedAccount(account)
    setPage('transactions')
    setError('')
    if (!account) {
      setTransactions([])
      return
    }
    try {
      setTransactions(await api.transactions(account.id))
    } catch (transactionError) {
      setError(transactionError.message)
    }
  }

  const saveCustomer = async () => {
    await refresh()
    setMessage('Customer added successfully')
  }

  const saveAccount = async () => {
    await refresh()
    setMessage('Account added successfully')
  }

  const completeOperation = async (successMessage) => {
    await refresh()
    setMessage(successMessage)
  }

  const pageTitle = {
    dashboard: 'Dashboard',
    customers: 'Customers',
    accounts: 'Accounts',
    deposit: 'Deposit',
    withdraw: 'Withdraw',
    transfer: 'Transfer',
    transactions: 'Transactions'
  }[page] || 'Dashboard'

  if (!user) return <Login onLogin={setUser} />

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand"><span className="brand-icon" aria-hidden="true">🏦</span><span>Login 360 Bank</span></div>
        <div className="userbox">👤 {user}</div>
        <nav>
          <button className={page === 'dashboard' ? 'active' : ''} onClick={() => setPage('dashboard')}>📊 Dashboard</button>
          <div className="nav-group">
            <button
              className={page !== 'dashboard' ? 'active' : ''}
              aria-expanded={operationsOpen}
              onClick={() => setOperationsOpen(!operationsOpen)}
            >
              💰 Banking Operations <span aria-hidden="true">{operationsOpen ? '▾' : '▸'}</span>
            </button>
            {operationsOpen && (
              <div className="nav-submenu">
                <button className={page === 'customers' ? 'active' : ''} onClick={() => setPage('customers')}>👥 Customers</button>
                <button className={page === 'accounts' ? 'active' : ''} onClick={() => setPage('accounts')}>💳 Accounts</button>
                <button className={page === 'deposit' ? 'active' : ''} onClick={() => setPage('deposit')}><OperationIcon type="deposit" className="nav-operation-icon" />Deposit</button>
                <button className={page === 'withdraw' ? 'active' : ''} onClick={() => setPage('withdraw')}><OperationIcon type="withdraw" className="nav-operation-icon" />Withdraw</button>
                <button className={page === 'transfer' ? 'active' : ''} onClick={() => setPage('transfer')}><OperationIcon type="transfer" className="nav-operation-icon" />Transfer</button>
                <button className={page === 'transactions' ? 'active' : ''} onClick={() => openTransactions(selectedAccount || accounts[0] || null)}>📜 Transactions</button>
              </div>
            )}
          </div>
        </nav>
        <button className="logout" onClick={logout}>Logout</button>
      </aside>

      <main className="content">
        <header>
          <div>
            <h2>{pageTitle}</h2>
            <p className="muted">Welcome back, {user}</p>
          </div>
          <button className="secondary" onClick={refresh}>↻ Refresh</button>
        </header>

        {message && <div className="success">{message}</div>}
        {error && <div className="error">{error}</div>}

        {page === 'dashboard' && <Dashboard accounts={accounts} customers={customers} onTransactions={openTransactions} />}
        {page === 'customers' && <Customers customers={customers} onSaved={saveCustomer} />}
        {page === 'accounts' && <Accounts accounts={accounts} customers={customers} onSaved={saveAccount} onTransactions={openTransactions} />}
        {['deposit', 'withdraw', 'transfer'].includes(page) && <OperationForm key={page} type={page} accounts={accounts} onDone={completeOperation} />}
        {page === 'transactions' && <Transactions account={selectedAccount} transactions={transactions} />}
      </main>
    </div>
  )
}

export default App

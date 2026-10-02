import { useState } from 'react'
import { api } from '../api'
import AccountTable from './AccountTable'

function Accounts({ accounts, customers, onSaved, onTransactions }) {
  const [form, setForm] = useState({ accountNumber: '', accountType: 'SAVINGS', balance: '', customerId: '' })

  const submit = async (event) => {
    event.preventDefault()
    try {
      await api.addAccount({
        accountNumber: form.accountNumber,
        accountType: form.accountType,
        balance: Number(form.balance || 0),
        customer: { id: Number(form.customerId) }
      })
      setForm({ accountNumber: '', accountType: 'SAVINGS', balance: '', customerId: '' })
      await onSaved()
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="grid-2">
      <section className="panel">
        <h3>Open Account</h3>
        {customers.length === 0 ? <p className="muted">Add a customer first.</p> : (
          <form onSubmit={submit} className="form-grid">
            <input placeholder="Account number" required value={form.accountNumber} onChange={event => setForm({ ...form, accountNumber: event.target.value })} />
            <select value={form.accountType} onChange={event => setForm({ ...form, accountType: event.target.value })}>
              <option>SAVINGS</option><option>CURRENT</option>
            </select>
            <input type="number" min="0" step="0.01" placeholder="Opening balance" value={form.balance} onChange={event => setForm({ ...form, balance: event.target.value })} />
            <select required value={form.customerId} onChange={event => setForm({ ...form, customerId: event.target.value })}>
              <option value="">Select customer</option>
              {customers.map(customer => <option key={customer.id} value={customer.id}>{customer.name}</option>)}
            </select>
            <button className="primary">Create Account</button>
          </form>
        )}
      </section>
      <section className="panel">
        <h3>Account List</h3>
        <AccountTable accounts={accounts} onTransactions={onTransactions} />
      </section>
    </div>
  )
}

export default Accounts

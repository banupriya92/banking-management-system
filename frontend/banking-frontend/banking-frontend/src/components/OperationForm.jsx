import { useState } from 'react'
import { api } from '../api'
import OperationIcon from './OperationIcon'

function OperationForm({ type, accounts, onDone }) {
  const [form, setForm] = useState(type === 'transfer'
    ? { fromAccount: '', toAccount: '', amount: '', description: '' }
    : { account: '', amount: '', description: '' })
  const isTransfer = type === 'transfer'
  const title = type === 'withdraw' ? 'Withdraw' : isTransfer ? 'Transfer' : 'Deposit'
  const iconType = type === 'withdraw' ? 'withdraw' : isTransfer ? 'transfer' : 'deposit'

  const submit = async (event) => {
    event.preventDefault()
    try {
      const amount = Number(form.amount)
      if (isTransfer) {
        await api.transfer({ ...form, amount })
      } else if (type === 'withdraw') {
        await api.withdraw(form.account, { amount, description: form.description })
      } else {
        await api.deposit(form.account, { amount, description: form.description })
      }
      setForm(isTransfer
        ? { fromAccount: '', toAccount: '', amount: '', description: '' }
        : { account: '', amount: '', description: '' })
      await onDone(`${title} successful`)
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <section className="panel operation-panel">
      <h3 className="operation-title"><OperationIcon type={iconType} className={`operation-icon ${iconType}`} />{title}</h3>
      <form onSubmit={submit} className="form-grid">
        {isTransfer ? <>
          <select required value={form.fromAccount} onChange={event => setForm({ ...form, fromAccount: event.target.value })}>
            <option value="">From account</option>
            {accounts.map(account => <option key={account.id} value={account.accountNumber}>{account.accountNumber} - {account.customer?.name}</option>)}
          </select>
          <select required value={form.toAccount} onChange={event => setForm({ ...form, toAccount: event.target.value })}>
            <option value="">To account</option>
            {accounts.map(account => <option key={account.id} value={account.accountNumber}>{account.accountNumber} - {account.customer?.name}</option>)}
          </select>
        </> : (
          <select required value={form.account} onChange={event => setForm({ ...form, account: event.target.value })}>
            <option value="">Select account</option>
            {accounts.map(account => <option key={account.id} value={account.accountNumber}>{account.accountNumber} - {account.customer?.name}</option>)}
          </select>
        )}
        <input required type="number" min="0.01" step="0.01" placeholder="Amount" value={form.amount} onChange={event => setForm({ ...form, amount: event.target.value })} />
        <input placeholder="Description" value={form.description} onChange={event => setForm({ ...form, description: event.target.value })} />
        <button className="primary operation-submit"><OperationIcon type={iconType} className="button-operation-icon" />{title}</button>
      </form>
    </section>
  )
}

export default OperationForm

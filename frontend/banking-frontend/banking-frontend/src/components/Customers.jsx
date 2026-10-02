import { useState } from 'react'
import { api } from '../api'

function Customers({ customers, onSaved }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' })

  const submit = async (event) => {
    event.preventDefault()
    try {
      await api.addCustomer(form)
      setForm({ name: '', email: '', phone: '', address: '' })
      await onSaved()
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="grid-2">
      <section className="panel">
        <h3>Add Customer</h3>
        <form onSubmit={submit} className="form-grid">
          <input placeholder="Full name" required value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} />
          <input placeholder="Email" type="email" required value={form.email} onChange={event => setForm({ ...form, email: event.target.value })} />
          <input placeholder="Phone" value={form.phone} onChange={event => setForm({ ...form, phone: event.target.value })} />
          <input placeholder="Address" value={form.address} onChange={event => setForm({ ...form, address: event.target.value })} />
          <button className="primary">Save Customer</button>
        </form>
      </section>
      <section className="panel">
        <h3>Customer List</h3>
        <div className="table-wrap">
          <table>
            <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th></tr></thead>
            <tbody>
              {customers.map(customer => (
                <tr key={customer.id}>
                  <td>{customer.id}</td><td>{customer.name}</td><td>{customer.email}</td><td>{customer.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default Customers

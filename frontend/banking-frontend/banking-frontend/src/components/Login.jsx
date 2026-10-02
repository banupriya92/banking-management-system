import { useState } from 'react'

function Login({ onLogin }) {
  const [form, setForm] = useState({ username: 'admin', password: 'admin123' })
  const [error, setError] = useState('')

  const submit = (event) => {
    event.preventDefault()
    setError('')
    const username = form.username || 'admin'
    localStorage.setItem('bankUser', username)
    onLogin(username)
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="brand large"><span className="brand-icon" aria-hidden="true">🏦</span><span>Login 360 Bank</span></div>
        <svg
          className="login-illustration"
          viewBox="0 0 360 150"
          role="img"
          aria-label="Illustration of a bank building with coins"
        >
          <rect x="12" y="8" width="336" height="134" rx="18" fill="#eff6ff" />
          <circle cx="295" cy="38" r="17" fill="#bfdbfe" />
          <circle cx="322" cy="62" r="9" fill="#dbeafe" />
          <path d="M78 63 180 24l102 39H78Z" fill="#2563eb" />
          <path d="M90 67h180v10H90z" fill="#1d4ed8" />
          <path d="M101 82h18v42h-18zm40 0h18v42h-18zm40 0h18v42h-18zm40 0h18v42h-18zm40 0h18v42h-18z" fill="#60a5fa" />
          <path d="M88 126h184v9H88z" fill="#1e40af" />
          <circle cx="69" cy="105" r="22" fill="#fbbf24" />
          <circle cx="69" cy="105" r="15" fill="#fde68a" />
          <path d="M73 94c-8-3-13 2-13 7 0 8 15 5 15 12 0 5-6 9-14 5m7-29v33" fill="none" stroke="#b45309" strokeLinecap="round" strokeWidth="3" />
          <circle cx="294" cy="111" r="17" fill="#fbbf24" />
          <circle cx="294" cy="111" r="11" fill="#fde68a" />
          <path d="M297 103c-6-2-10 1-10 5 0 6 11 4 11 9 0 4-4 6-10 4m5-22v24" fill="none" stroke="#b45309" strokeLinecap="round" strokeWidth="2" />
        </svg>
        <h1>Banking Management System</h1>
        <p className="muted">Admin Login</p>
        <form onSubmit={submit}>
          <label>Username</label>
          <input value={form.username} onChange={event => setForm({ ...form, username: event.target.value })} />
          <label>Password</label>
          <input type="password" value={form.password} onChange={event => setForm({ ...form, password: event.target.value })} />
          {error && <div className="error">{error}</div>}
          <button className="primary full">Login</button>
        </form>
        <p className="hint">Demo: admin / admin123</p>
      </div>
    </div>
  )
}

export default Login

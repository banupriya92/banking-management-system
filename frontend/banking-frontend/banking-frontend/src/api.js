const BASE_URL = 'http://localhost:8080/api'

async function request(url, options = {}) {
  const response = await fetch(BASE_URL + url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data.error || data.message || 'Request failed')
  }
  return data
}

export const api = {
  login: (body) => request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(body)
  }),

  customers: () => request('/customers'),
  addCustomer: (body) => request('/customers', {
    method: 'POST',
    body: JSON.stringify(body)
  }),

  accounts: () => request('/accounts'),
  addAccount: (body) => request('/accounts', {
    method: 'POST',
    body: JSON.stringify(body)
  }),

  deposit: (number, body) => request(`/accounts/${number}/deposit`, {
    method: 'POST',
    body: JSON.stringify(body)
  }),

  withdraw: (number, body) => request(`/accounts/${number}/withdraw`, {
    method: 'POST',
    body: JSON.stringify(body)
  }),

  transfer: (body) => request('/transfers', {
    method: 'POST',
    body: JSON.stringify(body)
  }),

  transactions: (accountId) => request(`/accounts/${accountId}/transactions`)
}

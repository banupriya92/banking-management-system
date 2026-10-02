function OperationIcon({ type, className }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="44" height="44" rx="14" fill="currentColor" opacity=".12" />
      {type === 'deposit' && <>
        <ellipse cx="16" cy="34" rx="10" ry="3.5" fill="#d97706" />
        <path d="M6 29v5c0 2 4.5 3.5 10 3.5s10-1.5 10-3.5v-5" fill="#f59e0b" />
        <ellipse cx="16" cy="29" rx="10" ry="3.5" fill="#fbbf24" />
        <ellipse cx="16" cy="29" rx="6.5" ry="2" stroke="#fff7cc" strokeWidth="1.5" />
        <path d="M34 29V13m0 0-6 6m6-6 6 6" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M27 34h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity=".75" />
      </>}
      {type === 'withdraw' && <>
        <ellipse cx="16" cy="34" rx="10" ry="3.5" fill="#d97706" />
        <path d="M6 29v5c0 2 4.5 3.5 10 3.5s10-1.5 10-3.5v-5" fill="#f59e0b" />
        <ellipse cx="16" cy="29" rx="10" ry="3.5" fill="#fbbf24" />
        <ellipse cx="16" cy="29" rx="6.5" ry="2" stroke="#fff7cc" strokeWidth="1.5" />
        <path d="M34 13v16m0 0-6-6m6 6 6-6" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M27 34h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity=".75" />
      </>}
      {type === 'transfer' && <>
        <circle cx="24" cy="24" r="18" fill="currentColor" opacity=".12" />
        <path d="M9 17h26m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M39 31H13m0 0 6-6m-6 6 6 6" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </>}
    </svg>
  )
}

export default OperationIcon

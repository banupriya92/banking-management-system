# Banking Management System

A full-stack banking management demo with a React frontend and a Java 8 / Spring Boot backend. It supports customer and account management, account deposits and withdrawals, transfers, and transaction history.

> **Demo only:** This project uses sample administrator credentials and a local H2 database. The current frontend login is a demo screen and does not authenticate against the backend; banking API endpoints are not protected by authentication. Do not use this project with real financial or personal data or deploy it as a production banking system without implementing and reviewing appropriate authentication, authorization, password handling, input validation, and security controls.

## Contents

- [Features](#features)
- [Project layout](#project-layout)
- [Technology](#technology)
- [Requirements](#requirements)
- [Run the project](#run-the-project)
- [Frontend guide](#frontend-guide)
- [Backend and database](#backend-and-database)
- [REST API](#rest-api)
- [Build and verification](#build-and-verification)
- [Troubleshooting](#troubleshooting)

## Features

- Dashboard with customer and account counts, total balance, and account overview.
- Create and browse customers.
- Open accounts linked to a customer, with savings or current account types.
- Separate screens for deposits, withdrawals, and transfers.
- Browse transaction history for an account.
- Seed sample administrator, customer, and account records in an empty database.

## Project layout

```text
Banking Project/
├── README.md
├── .gitignore
├── backend/
│   └── banking-backend/
│       └── banking-backend-java8/
│           ├── pom.xml
│           └── src/main/
└── frontend/
    └── banking-frontend/
        └── banking-frontend/
            ├── package.json
            ├── index.html
            └── src/
```

The backend and frontend are maintained together in this repository. Start them as two separate processes.

## Technology

| Area | Technology |
| --- | --- |
| Frontend | React 19, JavaScript, Vite 7, CSS |
| Backend | Java 8, Spring Boot 2.7.18, Spring Web, Spring Data JPA |
| Persistence | Hibernate and H2 file database |
| Build tools | npm and Maven |

## Requirements

- Java 8 (JDK).
- Maven.
- Node.js 20.19+ or 22.12+, and npm (required by Vite 7).
- A browser.

Check that the tools are available:

```bash
java -version
mvn -version
node --version
npm --version
```

## Run the project

### 1. Start the backend

From the repository root:

```bash
cd backend/banking-backend/banking-backend-java8
mvn spring-boot:run
```

The backend listens at `http://localhost:8080`. Keep this terminal open while using the frontend.

### 2. Start the frontend

In another terminal, from the repository root:

```bash
cd frontend/banking-frontend/banking-frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

### Demo sign-in

The sign-in screen is prefilled with:

- Username: `admin`
- Password: `admin123`

This is only a client-side demo sign-in. The screen stores the chosen username in browser `localStorage`; it does not call the backend login API or establish an authenticated session. Clearing the browser's local storage signs the demo user out.

The backend also has a `POST /api/auth/login` endpoint that checks the seeded administrator credentials, but the current frontend does not use it.

## Frontend guide

Use the sidebar to navigate between:

- **Dashboard** — summary counts, total balance, and account overview.
- **Customers** — create customers and view the customer list.
- **Accounts** — open accounts for existing customers and view account balances.
- **Deposit** — add funds to a selected account.
- **Withdraw** — withdraw funds from a selected account.
- **Transfer** — transfer funds between two different accounts.
- **Transactions** — view transactions for a selected account.

The frontend API base URL is currently set to `http://localhost:8080/api` in `src/api.js`. The Vite development server uses port `5173`. The backend's CORS configuration allows `http://localhost:5173`; if either address changes, update the frontend API URL and backend CORS configuration accordingly.

## Backend and database

The Spring Boot application is in `backend/banking-backend/banking-backend-java8`. Its configuration is in `src/main/resources/application.properties`.

### H2 database

- Database type: file-based H2.
- File location: `data/bankingdb` relative to the backend working directory.
- JDBC URL: `jdbc:h2:file:./data/bankingdb`
- Username: `sa`
- Password: blank
- Schema updates: Hibernate is configured with `ddl-auto=update`.

The application creates sample records when the corresponding tables are empty:

- Administrator: `admin` / `admin123`
- Customer accounts: `1000001001` (SAVINGS) and `1000001002` (CURRENT)
- Sample customers: Arun Kumar and Priya Sharma

The H2 Console is enabled at `http://localhost:8080/h2-console`. Connect using the JDBC URL and credentials above. Keep the application running while using the console.

The local database is intentionally excluded from Git. Back it up before changing or removing database files. Do not store production or real customer data in this demo.

## REST API

Base URL: `http://localhost:8080/api`

All request bodies below use JSON. Monetary values should be positive decimal numbers. The backend rejects amounts that are zero or negative, withdrawals/transfers with insufficient balance, transfers to the same account, and requests for nonexistent accounts.

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/auth/login` | Validate the demo administrator credentials. |
| `GET` | `/customers` | List customers. |
| `POST` | `/customers` | Create a customer. |
| `GET` | `/accounts` | List accounts with their associated customer. |
| `POST` | `/accounts` | Create an account. |
| `POST` | `/accounts/{accountNumber}/deposit` | Deposit funds. |
| `POST` | `/accounts/{accountNumber}/withdraw` | Withdraw funds. |
| `GET` | `/accounts/{accountId}/transactions` | List an account's transactions, newest first. |
| `POST` | `/transfers` | Transfer funds between accounts. |

### Create a customer

```http
POST /api/customers
Content-Type: application/json
```

```json
{
  "name": "Jordan Lee",
  "email": "jordan@example.com",
  "phone": "5551234567",
  "address": "Example City"
}
```

`name` and `email` are required by the database model. Email addresses must be unique.

### Create an account

The `customer.id` must refer to an existing customer. `balance` may be omitted to start at zero.

```http
POST /api/accounts
Content-Type: application/json
```

```json
{
  "accountNumber": "1000001003",
  "accountType": "SAVINGS",
  "balance": 1000.00,
  "customer": {
    "id": 1
  }
}
```

### Deposit or withdraw

Use the relevant `deposit` or `withdraw` path and the account number:

```http
POST /api/accounts/1000001001/deposit
Content-Type: application/json
```

```json
{
  "amount": 1000.00,
  "description": "Cash deposit"
}
```

Withdrawal uses the same body at `/api/accounts/1000001001/withdraw`.

### Transfer

```http
POST /api/transfers
Content-Type: application/json
```

```json
{
  "fromAccount": "1000001001",
  "toAccount": "1000001002",
  "amount": 500.00,
  "description": "Fund transfer"
}
```

A completed transfer records a `TRANSFER_OUT` transaction for the source account and a `TRANSFER_IN` transaction for the destination account.

### List transactions

```http
GET /api/accounts/1/transactions
```

`1` is the account's database ID, not its account number. Transaction types include `DEPOSIT`, `WITHDRAW`, `TRANSFER_OUT`, and `TRANSFER_IN`.

### Login

```http
POST /api/auth/login
Content-Type: application/json
```

```json
{
  "username": "admin",
  "password": "admin123"
}
```

Successful login returns a JSON response containing `success`, `message`, and `username`. This endpoint does not issue a session or token and does not protect the other API endpoints.

### Errors

The backend returns HTTP `400 Bad Request` with an `error` message for invalid banking operations. Unexpected server errors return HTTP `500` with a generic error message.

## Build and verification

Build the frontend for production:

```bash
cd frontend/banking-frontend/banking-frontend
npm run build
```

The generated frontend files are written to `dist/`, which is excluded from Git.

Compile and run any available backend tests:

```bash
cd backend/banking-backend/banking-backend-java8
mvn test
```

## Troubleshooting

- **Port 8080 is already in use:** stop the other process or change `server.port` in the backend `application.properties`; update the frontend API base URL to match.
- **The frontend cannot reach the API:** start the backend, check `http://localhost:8080/api/customers`, and confirm that the frontend URL and backend CORS origin agree.
- **A database connection or schema problem occurs:** check the JDBC URL and ensure the backend can write to its `data/` directory.
- **Demo customers or accounts are missing:** the sample initializer seeds records only when the relevant database tables are empty. Existing H2 files are retained between runs.
- **Maven or Java version errors occur:** ensure Maven is running with a Java 8 JDK, not only a Java runtime.

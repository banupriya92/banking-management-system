# Banking Management System - Backend

## Technology
- Java 8
- Spring Boot 3.5.6
- Spring Web
- Spring Data JPA
- Hibernate
- H2 Database
- Lombok
- Maven

## Run in IntelliJ / Eclipse
1. Import this folder as a Maven project.
2. Make sure Java 8 is configured.
3. Run `BankingApplication.java`.

## Run from terminal
```bash
mvn spring-boot:run
```

Backend URL:
`http://localhost:8080`

H2 Console:
`http://localhost:8080/h2-console`

H2 JDBC URL:
`jdbc:h2:file:./data/bankingdb`
Username: `sa`
Password: leave blank

## Demo Login
Username: `admin`
Password: `admin123`

## APIs

POST `/api/auth/login`

GET/POST `/api/customers`

GET/POST `/api/accounts`

POST `/api/accounts/{accountNumber}/deposit`

POST `/api/accounts/{accountNumber}/withdraw`

GET `/api/accounts/{accountId}/transactions`

POST `/api/transfers`

Example deposit:
```json
{
  "amount": 1000,
  "description": "Cash deposit"
}
```

Example transfer:
```json
{
  "fromAccount": "1000001001",
  "toAccount": "1000001002",
  "amount": 500,
  "description": "Fund transfer"
}
```

## Java 8 compatibility
Uses Spring Boot 2.7.18 and javax.persistence, and avoids Java 9+ APIs.

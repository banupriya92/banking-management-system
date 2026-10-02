package com.example.banking.service;

import com.example.banking.dto.AmountRequest;
import com.example.banking.dto.TransferRequest;
import com.example.banking.model.*;
import com.example.banking.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class BankingService {
    private final CustomerRepository customerRepository;
    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;

    public BankingService(CustomerRepository customerRepository,
                          AccountRepository accountRepository,
                          TransactionRepository transactionRepository) {
        this.customerRepository = customerRepository;
        this.accountRepository = accountRepository;
        this.transactionRepository = transactionRepository;
    }

    public List<Customer> customers() { return customerRepository.findAll(); }
    public Customer saveCustomer(Customer c) { return customerRepository.save(c); }

    public List<Account> accounts() { return accountRepository.findAll(); }

    public Account saveAccount(Account a) {
        if (a.getBalance() == null) a.setBalance(BigDecimal.ZERO);
        return accountRepository.save(a);
    }

    public List<Transaction> transactions(Long accountId) {
        return transactionRepository.findByAccountIdOrderByTransactionDateDesc(accountId);
    }

    @Transactional
    public Account deposit(String number, AmountRequest req) {
        Account a = getAccount(number);
        validateAmount(req.getAmount());
        a.setBalance(a.getBalance().add(req.getAmount()));
        accountRepository.save(a);
        saveTransaction(a, "DEPOSIT", req.getAmount(), req.getDescription());
        return a;
    }

    @Transactional
    public Account withdraw(String number, AmountRequest req) {
        Account a = getAccount(number);
        validateAmount(req.getAmount());
        if (a.getBalance().compareTo(req.getAmount()) < 0)
            throw new IllegalArgumentException("Insufficient balance");
        a.setBalance(a.getBalance().subtract(req.getAmount()));
        accountRepository.save(a);
        saveTransaction(a, "WITHDRAW", req.getAmount(), req.getDescription());
        return a;
    }

    @Transactional
    public void transfer(TransferRequest req) {
        validateAmount(req.getAmount());
        Account from = getAccount(req.getFromAccount());
        Account to = getAccount(req.getToAccount());

        if (from.getAccountNumber().equals(to.getAccountNumber()))
            throw new IllegalArgumentException("Source and destination accounts must be different");
        if (from.getBalance().compareTo(req.getAmount()) < 0)
            throw new IllegalArgumentException("Insufficient balance");

        from.setBalance(from.getBalance().subtract(req.getAmount()));
        to.setBalance(to.getBalance().add(req.getAmount()));
        accountRepository.save(from);
        accountRepository.save(to);

        String desc = req.getDescription() == null ? "Transfer" : req.getDescription();
        saveTransaction(from, "TRANSFER_OUT", req.getAmount(), desc + " to " + to.getAccountNumber());
        saveTransaction(to, "TRANSFER_IN", req.getAmount(), desc + " from " + from.getAccountNumber());
    }

    private Account getAccount(String number) {
        return accountRepository.findByAccountNumber(number)
                .orElseThrow(() -> new IllegalArgumentException("Account not found: " + number));
    }

    private void validateAmount(BigDecimal amount) {
        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0)
            throw new IllegalArgumentException("Amount must be greater than zero");
    }

    private void saveTransaction(Account a, String type, BigDecimal amount, String desc) {
        Transaction t = new Transaction();
        t.setAccount(a);
        t.setType(type);
        t.setAmount(amount);
        t.setDescription(desc);
        t.setTransactionDate(LocalDateTime.now());
        transactionRepository.save(t);
    }
}

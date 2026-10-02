package com.example.banking.controller;

import com.example.banking.dto.AmountRequest;
import com.example.banking.model.Account;
import com.example.banking.service.BankingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {
    private final BankingService service;
    public AccountController(BankingService service) { this.service = service; }

    @GetMapping
    public List<Account> getAll() { return service.accounts(); }

    @PostMapping
    public Account create(@RequestBody Account account) { return service.saveAccount(account); }

    @PostMapping("/{number}/deposit")
    public Account deposit(@PathVariable String number, @RequestBody AmountRequest request) {
        return service.deposit(number, request);
    }

    @PostMapping("/{number}/withdraw")
    public Account withdraw(@PathVariable String number, @RequestBody AmountRequest request) {
        return service.withdraw(number, request);
    }

    @GetMapping("/{id}/transactions")
    public Object transactions(@PathVariable Long id) {
        return service.transactions(id);
    }
}

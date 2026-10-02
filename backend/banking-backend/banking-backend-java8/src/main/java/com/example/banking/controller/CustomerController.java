package com.example.banking.controller;

import com.example.banking.model.Customer;
import com.example.banking.service.BankingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {
    private final BankingService service;
    public CustomerController(BankingService service) { this.service = service; }

    @GetMapping
    public List<Customer> getAll() { return service.customers(); }

    @PostMapping
    public Customer create(@RequestBody Customer customer) { return service.saveCustomer(customer); }
}

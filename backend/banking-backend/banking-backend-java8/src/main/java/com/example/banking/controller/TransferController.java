package com.example.banking.controller;

import com.example.banking.dto.TransferRequest;
import com.example.banking.service.BankingService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/transfers")
public class TransferController {
    private final BankingService service;
    public TransferController(BankingService service) { this.service = service; }

    @PostMapping
    public Map<String,Object> transfer(@RequestBody TransferRequest request) {
        service.transfer(request);
        Map<String,Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Transfer completed successfully");
        return response;
    }
}

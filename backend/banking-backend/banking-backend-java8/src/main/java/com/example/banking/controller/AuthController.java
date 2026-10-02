package com.example.banking.controller;

import com.example.banking.dto.LoginRequest;
import com.example.banking.model.Admin;
import com.example.banking.repository.AdminRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AdminRepository adminRepository;

    public AuthController(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @PostMapping("/login")
    public Map<String,Object> login(@RequestBody LoginRequest request) {
        Admin admin = adminRepository.findByUsernameAndPassword(
                request.getUsername(), request.getPassword()
        ).orElseThrow(() -> new IllegalArgumentException("Invalid username or password"));

        Map<String,Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Login successful");
        response.put("username", admin.getUsername());
        return response;
    }
}

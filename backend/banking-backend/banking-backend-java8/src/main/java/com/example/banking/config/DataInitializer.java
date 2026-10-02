package com.example.banking.config;

import com.example.banking.model.*;
import com.example.banking.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner init(AdminRepository adminRepo,
                           CustomerRepository customerRepo,
                           AccountRepository accountRepo) {
        return args -> {
            if (adminRepo.count() == 0) {
                adminRepo.save(new Admin(null, "admin", "admin123"));
            }

            if (customerRepo.count() == 0) {
                Customer c1 = customerRepo.save(new Customer(null, "Arun Kumar", "arun@example.com", "9876543210", "Chennai"));
                Customer c2 = customerRepo.save(new Customer(null, "Priya Sharma", "priya@example.com", "9876543211", "Bengaluru"));

                accountRepo.save(new Account(null, "1000001001", "SAVINGS", new BigDecimal("25000.00"), c1));
                accountRepo.save(new Account(null, "1000001002", "CURRENT", new BigDecimal("50000.00"), c2));
            }
        };
    }
}

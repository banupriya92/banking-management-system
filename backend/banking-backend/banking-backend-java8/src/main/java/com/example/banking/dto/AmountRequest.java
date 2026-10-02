package com.example.banking.dto;
import lombok.Data;
import java.math.BigDecimal;
@Data
public class AmountRequest {
    private BigDecimal amount;
    private String description;
}

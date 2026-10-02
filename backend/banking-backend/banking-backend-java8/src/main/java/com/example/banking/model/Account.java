package com.example.banking.model;

import javax.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "accounts")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false, unique=true)
    private String accountNumber;

    @Column(nullable=false)
    private String accountType;

    @Column(nullable=false, precision=19, scale=2)
    private BigDecimal balance = BigDecimal.ZERO;

    @ManyToOne(optional=false)
    @JoinColumn(name="customer_id")
    private Customer customer;
}

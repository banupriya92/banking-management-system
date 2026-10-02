package com.example.banking.model;

import javax.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String type;

    @Column(nullable=false, precision=19, scale=2)
    private BigDecimal amount;

    @Column(nullable=false)
    private LocalDateTime transactionDate;

    private String description;

    @ManyToOne(optional=false)
    @JoinColumn(name="account_id")
    private Account account;
}

package com.example.order.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
@Entity
@Table(name = "orders")
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @Column(name = "order_number")
    private String orderNumber;

    @Column(name = "order_date")
    private LocalDate orderDate;

    @Column(name = "status")
    private String status;

    @Column(name = "total_amount")
    private BigDecimal totalAmount;
    
    @Column(name = "customer_id")
    private int customerId;
    
    @Column(name = "customer_name")
    private String customerName;

    @Column(name = "delivery_address")
    private String dileveryAddress;
    
    @Column(name = "delivery_date")
    private String dileveryDate;
    
    @Column(name = "payment_method")
    private String paymentMethod;
    
    @Column(name = "payment_status")
    private String paymentStatus;
    
    
    
    @OneToMany(targetEntity = OrderItem.class, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "order_items",referencedColumnName = "orderId")
    private List<OrderItem> orderItems;
    
    
    
//    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<OrderItem> orderItems;

}
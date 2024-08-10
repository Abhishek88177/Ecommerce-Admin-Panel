package com.example.order.model;
import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
@Entity
@Table(name = "order_items")
public class OrderItem {

	

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	
    @Column(name = "product_id")
    private int productId;

    @Column(name = "product_name")
    private String productName;
    
    @Column(name = "quantity")
    private int quantity;

    @Column(name = "price")
    private double price;
    
    @Column(name = "totalPrice")
    private BigDecimal totalPrice;
    
    
//    @ManyToOne
//    @JoinColumn(name = "order_id")
//    private Orders order;
    
    
    
    
    public OrderItem(int productId, String productName, int quantity, double price, BigDecimal totalPrice) {
		// TODO Auto-generated constructor stub
    	this.productId = productId;
        this.productName = productName;
        this.quantity = quantity;
        this.price = price;
        this.totalPrice = totalPrice;

	}



	public OrderItem(Long id, int productId, String productName, int quantity, double price, BigDecimal totalPrice) {
		super();
		this.id = id;
		this.productId = productId;
		this.productName = productName;
		this.quantity = quantity;
		this.price = price;
		this.totalPrice = totalPrice;
	
	}




	public OrderItem() {
		super();
		// TODO Auto-generated constructor stub
	}

    
}
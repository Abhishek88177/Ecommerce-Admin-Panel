package com.example.order.DTO;

import lombok.Data;

@Data
public class ProductDTO {
	
	private int productId;
    private String name;
    private String description;
    private double price;
    private int quantity;


}

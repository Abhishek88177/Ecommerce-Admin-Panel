package com.example.product.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.product.model.Product;
import com.example.product.service.ProductService;

@RestController
@RequestMapping("/public")
@CrossOrigin
public class PublicController {
	
	@Autowired
	ProductService productService;
	
	@GetMapping("/getAllProductWitoutPagination")
    public List<Product> getAllProductWitoutPagination() {
        
		return productService.getAllProductWithoutPagination();
    }

}

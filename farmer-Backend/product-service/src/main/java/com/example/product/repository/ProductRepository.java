package com.example.product.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.product.model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer>{
	
	Page<Product> findAll(Pageable pageable);

	List<Product> findByNameContainingIgnoreCase(String name);

}

package com.example.order.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.order.model.Orders;

public interface OrderRepo extends JpaRepository<Orders, Integer>{
	
	Page<Orders> findAll(Pageable pageable);
	
//	List<BigDecimal> 
}

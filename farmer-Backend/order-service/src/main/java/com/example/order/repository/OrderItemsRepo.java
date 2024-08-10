package com.example.order.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.order.model.OrderItem;

public interface OrderItemsRepo extends JpaRepository<OrderItem, Integer>{

}

package com.example.order.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.order.model.OrderItem;
import com.example.order.model.Orders;

public interface OrderService {

	public Orders saveOrder(Orders order);
	public List<Orders> getAllOrders();
	public Page<Orders> getAllOrdersWithPagination(Pageable pageable);
	public Orders getOrderById(int orderId);
	public List<OrderItem> getAllItemsById(int orderId);
	public String updatestatus(int orderId,String updatedStatus);
	public int totalOrders();
	public BigDecimal totalEarning();
	public List<BigDecimal> totalEarningDayByDay();
	
}

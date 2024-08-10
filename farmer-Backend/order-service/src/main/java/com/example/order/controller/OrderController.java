package com.example.order.controller;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.order.model.OrderItem;
import com.example.order.model.Orders;
import com.example.order.service.OrderService;

@RestController
@RequestMapping("/order")
//@CrossOrigin
public class OrderController {

	@Autowired
	OrderService orderService;	

	@PostMapping("/saveOrder")
	public Orders placeOrder(@RequestBody Orders order) {
		System.out.println(order);
		return orderService.saveOrder(order);
	}

	@GetMapping
	public ResponseEntity<List<Orders>> getAllOrders() {
		List<Orders> orders = orderService.getAllOrders();
		return ResponseEntity.ok(orders);
	}

	@GetMapping("/paged")
	public ResponseEntity<Page<Orders>> getAllOrdersWithPagination(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size,Sort.by(Sort.Direction.DESC, "orderId"));
        Page<Orders> orderPage = orderService.getAllOrdersWithPagination(pageable);
		return ResponseEntity.ok(orderPage);
	}

	@GetMapping("/{orderId}")
	public ResponseEntity<Orders> getOrderById(@PathVariable int orderId) {
		Orders order = orderService.getOrderById(orderId);
		return ResponseEntity.ok(order);
	}

	@GetMapping("/{orderId}/items")
	public ResponseEntity<List<OrderItem>> getAllItemsById(@PathVariable int orderId) {
		List<OrderItem> items = orderService.getAllItemsById(orderId);
		return ResponseEntity.ok(items);
	}
	
	@PutMapping("/updatestatus")
	public ResponseEntity<String> updateStatus(@RequestParam("id") int orderId , @RequestParam("status") String status) {
		String response = orderService.updatestatus(orderId, status);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/totalorders")
	public ResponseEntity<Integer> totalOrders(){
		int response = orderService.totalOrders();
		return ResponseEntity.ok(response);
	}
	
	
	@GetMapping("/totalearning")
	public ResponseEntity<BigDecimal> totalEarnings(){
		BigDecimal response = orderService.totalEarning();
		return ResponseEntity.ok(response);
	}

}

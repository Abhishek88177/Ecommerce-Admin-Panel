package com.example.order.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Service;

import com.example.order.DTO.ProductDTO;
import com.example.order.DTO.UserDTO;
import com.example.order.externalService.CustomerServiceClient;
import com.example.order.externalService.ProductServiceClient;
import com.example.order.model.OrderItem;
import com.example.order.model.Orders;
import com.example.order.repository.OrderRepo;

@Service
public class OrderServiceImpl implements OrderService{

	@Autowired
    private OrderRepo orderRepository;

    @Autowired
    private ProductServiceClient productServiceClient;
    
    @Autowired
    private CustomerServiceClient customerServiceClient; 
    
    @Override
    public Orders saveOrder(Orders order) {
        // Fetch product details and set them in order items
    	
        List<OrderItem> orderItems = order.getOrderItems().stream()
                .map(item -> {
                    ProductDTO productDTO = productServiceClient.getProductById(item.getProductId());
                    return new OrderItem(item.getProductId(), productDTO.getName(), item.getQuantity(), productDTO.getPrice(),item.getTotalPrice());
                })  
                .collect(Collectors.toList());
       
        UserDTO customer = customerServiceClient.getUserById(order.getCustomerId());
        order.setCustomerName(customer.getUserName());
        
        order.setOrderItems(orderItems);
        return orderRepository.save(order);
//    	return null;
        
        
    }

	@Override
	public List<Orders> getAllOrders() {
		// TODO Auto-generated method stub
		return orderRepository.findAll();
	}

	@Override
	public Page<Orders> getAllOrdersWithPagination(Pageable pageable) {
		// TODO Auto-generated method stub
		return orderRepository.findAll(pageable);
	}

	@Override
	public Orders getOrderById(int orderId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<OrderItem> getAllItemsById(int orderId) {
		// TODO Auto-generated method stub
		
		List<OrderItem> orderItemList = orderRepository.findById(orderId).get().getOrderItems();
		return orderItemList;
	}

	@Override
	public String updatestatus(int orderId, String updatedStatus) {
		// TODO Auto-generated method stub
		Orders order = orderRepository.findById(orderId).get();
		order.setStatus(updatedStatus);
		orderRepository.save(order);
		return "Update Successfully";
	}

	@Override
	public int totalOrders() {
		// TODO Auto-generated method stub
		List<Orders> orderList = orderRepository.findAll();
		
		return orderList.size();
	}

	@Override
	public BigDecimal totalEarning() {
		// TODO Auto-generated method stub
		List<Orders> orderList = orderRepository.findAll();
		BigDecimal result = orderList.stream().map(Orders :: getTotalAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
		return result;
	}

	@Override
	public List<BigDecimal> totalEarningDayByDay() {
		// TODO Auto-generated method stub
		return null;
	}

	


}

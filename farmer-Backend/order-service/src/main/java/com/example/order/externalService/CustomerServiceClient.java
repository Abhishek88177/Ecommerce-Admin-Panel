package com.example.order.externalService;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.order.DTO.UserDTO;

@FeignClient(name="user-service",url="http://localhost:8083/")
public interface CustomerServiceClient {
	
	@GetMapping("user/getUserById/{userid}")
	public UserDTO getUserById(@PathVariable("userid") int userId);
	

}

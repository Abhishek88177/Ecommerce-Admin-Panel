package com.example.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.user.model.Address;
import com.example.user.model.UserEntity;
import com.example.user.service.AddressService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
public class AddressController {
	
	@Autowired
	AddressService addressService;
	
	@PostMapping("/saveaddress")
	public Address saveUser(@RequestBody Address address) {
		return addressService.saveAddress(address);
	}


}

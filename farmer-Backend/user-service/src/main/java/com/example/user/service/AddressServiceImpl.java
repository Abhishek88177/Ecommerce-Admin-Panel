package com.example.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.user.model.Address;
import com.example.user.repository.AddressRepository;
import com.example.user.repository.UserRepository;

@Service
public class AddressServiceImpl implements AddressService{
	
	@Autowired
	AddressRepository addressRepo;
	
	@Autowired
	UserRepository userRepo;

	@Override
	public Address saveAddress(Address address) {
		
//		int userId = address.getUser().getUserId();
//		address.setUser(userRepo.findById(userId).get());		
		return addressRepo.save(address);
	}

}

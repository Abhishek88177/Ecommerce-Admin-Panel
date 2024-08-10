package com.example.user.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.user.model.Address;
import com.example.user.model.UserEntity;
import com.example.user.repository.AddressRepository;
import com.example.user.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	UserRepository userRepo;
	
	@Autowired
	AddressRepository addressRepo;

	@Override
	public UserEntity saveUser(UserEntity user) {	
		return userRepo.save(user);
	}

	@Override
	public List<UserEntity> getAllUser() {
		List<Address> listAddress = addressRepo.findAll();
		
		return userRepo.findAll();
	}
	
	@Override
	public Page<UserEntity> getAllUserWithPage(Pageable pageable) {
		
		return userRepo.findAll(pageable);
	}

	@Override
	public UserEntity getByUserId(int userId) {
		
		return userRepo.findById(userId).get();
	}

	@Override
	public UserEntity updateUser(UserEntity user) {
		
		UserEntity userData = userRepo.findById(user.getUserId()).get();
		
		if(userData == null) {
			return null;

		}
		
		userData.setUsername(user.getUsername());
		userData.setEmail(user.getEmail());
//		userData.setLocation(user.getLocation());
		userData.setMobileNo(user.getMobileNo());
		userData.setPassword(user.getPassword());
		return userRepo.save(userData);
	}

	@Override
	public String deleteUser(int userId) {
		// TODO Auto-generated method stub
		userRepo.deleteById(userId);
		return "User Deleted!";
	}

	@Override
	public UserEntity getByUserName(String userName) {
		UserEntity user = userRepo.findByUsername(userName);
		return user;
	}

	

}

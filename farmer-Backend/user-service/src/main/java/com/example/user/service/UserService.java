package com.example.user.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.user.model.UserEntity;

public interface UserService {
	
	public UserEntity saveUser(UserEntity user);
	public List<UserEntity> getAllUser();
	public Page<UserEntity> getAllUserWithPage(Pageable pageable);
	public UserEntity getByUserId(int userId);
	public UserEntity getByUserName(String userName);
	public UserEntity updateUser(UserEntity user); 
	public String deleteUser(int userId);
	
}

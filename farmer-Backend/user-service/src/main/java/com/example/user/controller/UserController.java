package com.example.user.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.user.model.UserEntity;
import com.example.user.service.UserService;


@RestController
@RequestMapping("/api/v1/user")
//@CrossOrigin
public class UserController {
	
	@Autowired
	UserService userService;
	
	
	@PostMapping("/saveuser")
	public UserEntity saveUser(@RequestBody UserEntity userData) {
		System.out.println(userData);
		return userService.saveUser(userData);
	}
	
	@GetMapping("/getAllUser")
	public List<UserEntity> getAllUser() {
		return userService.getAllUser();
	}
	
	@GetMapping("/getUserById/{userid}")
	public UserEntity getUserById(@PathVariable("userid") int userId) {
		return userService.getByUserId(userId);
	}
	
	@GetMapping("/getUserByusername/{username}")
	public UserEntity getUserByUserName(@PathVariable("username") String userName) {
		return userService.getByUserName(userName);
	}

	
	@GetMapping("/getAllUserWithPage")
	public Page<UserEntity> getAllUserWithPagination(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
		Pageable pageable = PageRequest.of(page, size);
		return userService.getAllUserWithPage(pageable);
	}

	@PutMapping("/updateUser")
	public UserEntity updateUserEntity(@RequestBody UserEntity userData) {
		return userService.updateUser(userData);	
	}
	
	@DeleteMapping("/deleteuser/{userId}")
	public String deleteUser(@PathVariable("userId") int userId) {
		return userService.deleteUser(userId);
	}
	
}

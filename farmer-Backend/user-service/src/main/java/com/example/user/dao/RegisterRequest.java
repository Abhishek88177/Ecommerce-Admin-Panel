package com.example.user.dao;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder

public class RegisterRequest {
	
	private String username;
	private String password;
	private String mobileNo;
	private String email;
	private String location;

	
}


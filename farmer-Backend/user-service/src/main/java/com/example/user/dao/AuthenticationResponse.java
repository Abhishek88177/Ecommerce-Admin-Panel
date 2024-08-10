package com.example.user.dao;


import com.example.user.model.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder

public class AuthenticationResponse {
	private String token;
	private Role role;
}

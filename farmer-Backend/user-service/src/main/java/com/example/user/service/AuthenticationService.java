package com.example.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.user.dao.AuthenticationRequest;
import com.example.user.dao.AuthenticationResponse;
import com.example.user.dao.RegisterRequest;
import com.example.user.model.Role;
import com.example.user.model.UserEntity;
import com.example.user.repository.UserRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;



@Service
@RequiredArgsConstructor
public class AuthenticationService {
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	
	public AuthenticationResponse register(RegisterRequest request) {
		
		var user = UserEntity.builder()
					.username(request.getUsername())
					.email(request.getEmail())
					.location(request.getLocation())
					.mobileNo(request.getMobileNo())
					.password(passwordEncoder.encode(request.getPassword()))
					.role(Role.USER)
				.build();
			userRepo.save(user);
			
			var jwtToken = jwtService.generateToken(user);
		return AuthenticationResponse.builder().token(jwtToken).build();
	}
	
	public AuthenticationResponse authenticate(AuthenticationRequest request) {
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(),request.getPassword()));
		var user = userRepo.findByUsername(request.getUsername());
		
		var jwtToken = jwtService.generateToken(user);
		return AuthenticationResponse.builder().token(jwtToken).role(user.getRole()).build();
		
	}
	
	public void validateToken(String token) {
		jwtService.validateToken(token);
	}

}

package com.example.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.user.dao.AuthenticationRequest;
import com.example.user.dao.AuthenticationResponse;
import com.example.user.dao.RegisterRequest;
import com.example.user.service.AuthenticationService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
	
	@Autowired
	private final AuthenticationService authService;
	
	@PostMapping("/register")
	public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request){
		return ResponseEntity.ok(authService.register(request));
	}
	
	@PostMapping("/login")
	public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest request){
		return ResponseEntity.ok(authService.authenticate(request));
	}
	
	@GetMapping("/validate")
	public String validateToken(@RequestParam("token")String token) {
		authService.validateToken(token);
		
		return "Token is valid";
	}
}

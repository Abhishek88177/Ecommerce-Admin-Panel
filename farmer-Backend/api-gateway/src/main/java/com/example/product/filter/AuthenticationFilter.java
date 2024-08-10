package com.example.product.filter;

import org.apache.hc.core5.http.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.stereotype.Component;

import com.example.product.util.JwtUtil;

@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config>{
	
	@Autowired
	private RouteValidator validator;

	@Autowired
	private JwtUtil jwtUtil;
	
	public static class Config {

	}
	
	public AuthenticationFilter() {
		super(Config.class);
	}

	@Override
	public GatewayFilter apply(Config config) {
		
		return ((exchange , chain) ->{
			if (validator.isSecured.test(exchange.getRequest())) {
				if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
					throw new RuntimeException("missing header");
				}
				String authHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
				if(authHeader != null && authHeader.startsWith("Bearer ")){
					authHeader = authHeader.substring(7);
				}
				try {
//					template.getForObject("http://CUSTOMER-SERVICE//validate?token"+ authHeader, String.class);
					
					jwtUtil.validateToken(authHeader);
				}catch(Exception e) {
					System.out.println("Invalid access ...!");
					throw new RuntimeException("unauthorized access to application");
				}
			}
			return chain.filter(exchange);
		});
	}
	

}

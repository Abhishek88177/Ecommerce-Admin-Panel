package com.example.product.filter;

import java.util.List;
import java.util.function.Predicate;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;


@Component
public class RouteValidator {

//	private static final List<String> openApiEndpoints = List.of(
//			"/api/v1/auth/**", "/api/v1/user/**", "/product/**", "/order/**"
//    );
//
//    private static final PathMatcher pathMatcher = new AntPathMatcher();
//
//    public static final Predicate<ServerHttpRequest> isSecured = request ->
//            openApiEndpoints.stream()
//                    .noneMatch(uri -> pathMatcher.match(uri, request.getURI().getPath()));
	
	
	public static final List<String> openApiEndpoints = List.of(
			"/api/v1/auth/**", "/api/v1/user/**", "/product/**", "/order/**","/public/**");
	
	public Predicate<ServerHttpRequest> isSecured= request ->
	openApiEndpoints.stream().noneMatch(uri->request.getURI().getPath().equals(uri));	
}

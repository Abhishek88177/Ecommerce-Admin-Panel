package com.example.order.externalService;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.order.DTO.ProductDTO;


@FeignClient(name = "product-service" , url = "http://localhost:8084" )
public interface ProductServiceClient {

	@GetMapping("/product/getProductByID/{productid}")
	public ProductDTO getProductById(@PathVariable("productid") int productId);
}

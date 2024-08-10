package com.example.product.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.product.model.Product;

public interface ProductService {
	
	//public Product saveProduct(ProductDTO productDto,MultipartFile imageFile) throws IOException;
	public Product saveProduct(Product product) ;
	public List<Product> getAllProductWithoutPagination();
	public Page<Product> getAllProduct(Pageable pageable);
	public Product getProductById(int productId);
	public List<Product> getProductByName(String name);
	public Product updateProduct(Product product);
	public String deleteByProductId(int productId);
	
	public String changeStatus(int productId);
	public int totalProduct();
	

}

package com.example.product.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.product.model.Category;

public interface CategoryService {
	
	public Category saveCategory(Category category , MultipartFile categoryImage) ;
	public List<Category> getAllCategory();
	public Category getCategoryById(int categoryId);
	public Category updateCategory(Category category , MultipartFile categoryImage);
	public String deleteByCatId(int catId);

}

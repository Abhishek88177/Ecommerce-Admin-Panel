package com.example.product.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.product.model.Category;
import com.example.product.model.Product;
import com.example.product.repository.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService{
	
	private static String uploadDirectory = System.getProperty("user.dir")+"/src/main/webapp/images";
	
	@Autowired
	CategoryRepository catRepo;

	@Override
	public Category saveCategory(Category category , MultipartFile categoryImage) {
		
		String orignalName = categoryImage.getOriginalFilename();
		Path imageUploadPath = Paths.get(uploadDirectory,orignalName);
		try {
			Files.write(imageUploadPath, categoryImage.getBytes());
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		category.setCatImages(orignalName);
		
		return catRepo.save(category);
	}

	@Override
	public List<Category> getAllCategory() {
		// TODO Auto-generated method stub
		return catRepo.findAll();
	}

	@Override
	public Category getCategoryById(int categoryId) {
		
		return catRepo.findById(categoryId).get();
	}
	
	@Override
	public Category updateCategory(Category category , MultipartFile categoryImage) {
		
		Category updateCat = catRepo.findById(category.getCatId()).get();
		
		if(updateCat == null) {
			return null;
		}
		
		
		updateCat.setCatName(category.getCatName());
		updateCat.setCatType(category.getCatType());
		
		
//		String img = updateCat.getCatImages();
//		System.out.println("check = "+categoryImage);
//		
//		if (categoryImage == null) {
//		    System.out.println(img);
//		    updateCat.setCatImages(img);
//		} else {
//			
//			String orignalName = categoryImage.getOriginalFilename();
//			Path imageUploadPath = Paths.get(uploadDirectory,orignalName);
//			try {
//				Files.write(imageUploadPath, categoryImage.getBytes());
//			} catch (IOException e) {
//				e.printStackTrace();
//			}
//			
//			updateCat.setCatImages(orignalName);
//		}
		
		if (categoryImage != null && !categoryImage.isEmpty()) {
	        String originalName = categoryImage.getOriginalFilename();
	        Path imageUploadPath = Paths.get(uploadDirectory, originalName);
	        
	        try {
	            Files.write(imageUploadPath, categoryImage.getBytes());
	            updateCat.setCatImages(originalName); // Update with the new image name
	        } catch (IOException e) {
	            e.printStackTrace();
	            // Handle the error appropriately, e.g., log it, throw a custom exception, etc.
	        }
	    } else {
	        // If no new image is provided, retain the existing image
	        updateCat.setCatImages(updateCat.getCatImages());
	    }

		
		return catRepo.save(updateCat);
	}

	@Override
	public String deleteByCatId(int catId) {
		
		catRepo.deleteById(catId);
		return "Deleted SuccessFully";
		
	}

	
}

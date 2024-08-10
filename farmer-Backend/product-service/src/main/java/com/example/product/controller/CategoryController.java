package com.example.product.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.product.model.Category;
import com.example.product.service.CategoryService;

@RestController
@RequestMapping("/product")
//@CrossOrigin
public class CategoryController {
	
	@Autowired
	CategoryService catService;
	
	private final ResourceLoader resourceLoader;
	
	public CategoryController(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }	
	
	private static String uploadDirectory = System.getProperty("user.dir")+"/src/main/webapp/images";
	
	@PostMapping("/addCategory")
	public Category saveCategory(@ModelAttribute Category category , @RequestParam("image") MultipartFile categoryImage) {
		return catService.saveCategory(category, categoryImage);
	}

	
	@GetMapping("/getAllCategory")
	public List<Category> getAllCategory(){
		return catService.getAllCategory();
	}
	
	@GetMapping("/getcategorybyid/{categoryid}")
	public Category getCategoryById(@PathVariable("categoryid") int categoryId){
		return catService.getCategoryById(categoryId);
	}
	
	
	@GetMapping("/catimage/{categoryid}")
    public ResponseEntity<Resource> fetchCategoryImage(@PathVariable("categoryid") int categoryId) {
        Category category = catService.getCategoryById(categoryId);
        
        
        if (category == null || category.getCatImages() == null) {
            return ResponseEntity.notFound().build();
        }

        try {
            Path imagePath = Paths.get(uploadDirectory,category.getCatImages());
            Resource resource = resourceLoader.getResource("file:" + imagePath);

            // Ensure resource exists and is readable
            if (!resource.exists() || !resource.isReadable()) {
                return ResponseEntity.notFound().build();
            }
            String contentType = Files.probeContentType(imagePath);

            System.out.println(resource);
            return ResponseEntity.ok()
                    .contentType(contentType != null ? MediaType.parseMediaType(contentType) : MediaType.APPLICATION_OCTET_STREAM)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        
        
    }
	
	@PutMapping("/updateCategory")
	public Category updateCategory(
			@ModelAttribute Category category ,
			@RequestParam(value = "image" , required = false) MultipartFile categoryImage) {
		return catService.updateCategory(category, categoryImage);
	}
	
	
	@DeleteMapping("/deletecategory/{catId}")
	public String deleteProduct(@PathVariable("catId") int catId) {
		return catService.deleteByCatId(catId);
	}

}

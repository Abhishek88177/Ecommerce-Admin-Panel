package com.example.product.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

import com.example.product.model.Product;
import com.example.product.service.ProductService;

@RestController
@RequestMapping("/product")
//@CrossOrigin
public class ProductController {

	@Autowired
	ProductService productService;
	
	private final ResourceLoader resourceLoader;
	
	public ProductController(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }	

	
	private static String uploadDirectory = System.getProperty("user.dir")+"/src/main/webapp/images";
	
	@PostMapping("/saveProduct")
	public Product saveProduct(@ModelAttribute Product product,
			@RequestParam("image") MultipartFile imageFile) throws IOException {
		
		
		String orignalName = imageFile.getOriginalFilename();
		Path fileNameAndPath = Paths.get(uploadDirectory , orignalName);
		Files.write(fileNameAndPath, imageFile.getBytes());
		
		
		product.setProductImage(orignalName);
		
		return productService.saveProduct(product);
		
		
//		try {
//			
//			
//			Product savedProduct = productService.saveProduct(productDto, imageFile);
//			return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
//		} catch (IOException e) {
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//		} catch (Exception e) {
//			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
//		}
	}
	
	@GetMapping("/getAllProductWitoutPagination")
    public List<Product> getAllProductWitoutPagination() {
        
		return productService.getAllProductWithoutPagination();
    }
	
	
	@GetMapping("/getAllProduct")
    public Page<Product> getAllProduct(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size,Sort.by(Sort.Direction.DESC, "productId"));
        return productService.getAllProduct(pageable);
    }
	
	
	@GetMapping("/getProductByID/{productid}")
	public Product getProductById(@PathVariable("productid") int productId) {
		// TODO Auto-generated method stub
		
		Product product = productService.getProductById(productId);
		
		return product;
	}
	
	
	@GetMapping("/getProductByName/{name}")
	public List<Product> getProductByName(@PathVariable("name") String name) {
		// TODO Auto-generated method stub
		
		List<Product> product = productService.getProductByName(name);
		
		return product;
	}
	
	
	
	@GetMapping("/image/{productid}")
    public ResponseEntity<Resource> fetchProductImage(@PathVariable("productid") int productId) {
        Product productById = productService.getProductById(productId);
        
        
        if (productById == null || productById.getProductImage() == null) {
            return ResponseEntity.notFound().build();
        }

        try {
            Path imagePath = Paths.get(uploadDirectory,productById.getProductImage());
            Resource resource = resourceLoader.getResource("file:" + imagePath);

            // Ensure resource exists and is readable
            if (!resource.exists() || !resource.isReadable()) {
                return ResponseEntity.notFound().build();
            }
            String contentType = Files.probeContentType(imagePath);
           
            return ResponseEntity.ok()
                    .contentType(contentType != null ? MediaType.parseMediaType(contentType) : MediaType.APPLICATION_OCTET_STREAM)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
	
	@PutMapping("/updateProduct")
	public Product updateProduct(@ModelAttribute Product product,
	                             @RequestParam(value = "image" , required = false) MultipartFile imageFile) throws IOException {
		
		System.out.println(imageFile);

	    // Handle the image file
	    if (imageFile != null && !imageFile.isEmpty()) {
	        String originalName = imageFile.getOriginalFilename();
	        Path fileNameAndPath = Paths.get(uploadDirectory, originalName);
	        
	     // Delete the old image file if it exists
	        if (product.getProductImage() != null && !product.getProductImage().isEmpty()) {
	            Path oldFileNameAndPath = Paths.get(uploadDirectory, product.getProductImage());
	            try {
	                Files.deleteIfExists(oldFileNameAndPath);
	            } catch (IOException e) {
	                // Log the error and throw an appropriate exception
	                System.err.println("Error deleting old image file: " + e.getMessage());
	                throw new IOException("Error deleting old image file", e);
	            }
	        }
	        
	        // Save the image file
	        try {
	            Files.write(fileNameAndPath, imageFile.getBytes());
	            product.setProductImage(originalName);
	        } catch (IOException e) {
	            // Log the error and throw an appropriate exception
	            System.err.println("Error saving image file: " + e.getMessage());
	            throw new IOException("Error saving image file", e);
	        }
	    }

	    // Save the product details
	    try {
	        return productService.updateProduct(product);
	    } catch (Exception e) {
	        // Log the error and throw an appropriate exception
	        System.err.println("Error saving product: " + e.getMessage());
	        throw new RuntimeException("Error saving product", e);
	    }
	}

	
	@DeleteMapping("/deleteproduct/{productid}")
	public String deleteProduct(@PathVariable("productid") int productId) {
		return productService.deleteByProductId(productId);
	}
	
	@PutMapping("/updateStatus/{productId}")
	public String updateStatus(@PathVariable("productId") int productId) {
		return productService.changeStatus(productId);
	}
	
	
	@GetMapping("/totalproduct")
	public ResponseEntity<Integer> totalProducts(){
		int response = productService.totalProduct();
		return ResponseEntity.ok(response);
	}
	
}



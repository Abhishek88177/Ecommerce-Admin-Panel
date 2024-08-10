
package com.example.product.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.product.model.Product;
import com.example.product.repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService{

	
	@Autowired
    private ProductRepository productRepository;

//    @Transactional
//    public Product saveProduct(ProductDTO productDto, MultipartFile imageFile) throws IOException {
//        if (!isValidImage(imageFile)) {
//            throw new IllegalArgumentException("Invalid image file type. Only PNG and JPEG are allowed.");
//        }
//
//        Product product = new Product();
//        product.setName(productDto.getName());
////        product.setProductImage(imageFile.getBytes());
//      //  product.setImageType(imageFile.getContentType());
//
//        return productRepository.save(product);
//    }
	
	public List<Product> getAllProductWithoutPagination() {
		return productRepository.findAll();
		
	}

    
	@Override
	public Page<Product> getAllProduct(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

	@Override
	public Product getProductById(int productId) {
		// TODO Auto-generated method stub
		
		return productRepository.findById(productId).get();
	}

	@Override
	public Product saveProduct(Product product) {
		// TODO Auto-generated method stub
		return productRepository.save(product);
	}

	@Override
	public Product updateProduct(Product product) {
		
		Product checkProduct = productRepository.findById(product.getProductId()).get();
		
		if(checkProduct == null) {
			return null;
		}
		
		
		checkProduct.setName(product.getName());
		checkProduct.setDescription(product.getDescription());
		checkProduct.setQuantity(product.getQuantity());
		checkProduct.setPrice(product.getPrice());	
		checkProduct.setCategory(product.getCategory());
		
		String img = checkProduct.getProductImage();
		System.out.println("check+"+product.getProductImage());
		
		if (product.getProductImage() == null) {
		    System.out.println(img);
		    checkProduct.setProductImage(img);
		} else {
		    checkProduct.setProductImage(product.getProductImage());
		}

		
		return productRepository.save(checkProduct);
	}

	@Override
	public String deleteByProductId(int productId) {
		
		productRepository.deleteById(productId);
		return "Deleted SuccessFully";
		
	}

	@Override
	public List<Product> getProductByName(String name) {
		
		List<Product> products = productRepository.findByNameContainingIgnoreCase(name);
		
		if(products == null) {
			return null;
		}
		
		return products;
	}
	
	
	public String changeStatus(int productId) {
		Product getProduct = productRepository.findById(productId).get();
		
		if(getProduct == null) {
			return null;
		}
		
		
		boolean currentStatus = getProduct.getStatus();
		
		if(currentStatus) {
			getProduct.setStatus(false);
		} else {
			getProduct.setStatus(true);
		}
		
		productRepository.save(getProduct);
		return "Status Changed";
		
	}


	@Override
	public int totalProduct() {
		List<Product> list= productRepository.findAll();
		return list.size(); 
	}

}

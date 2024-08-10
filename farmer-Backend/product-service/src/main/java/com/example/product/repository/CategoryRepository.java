package com.example.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.product.model.Category;


public interface CategoryRepository extends JpaRepository<Category, Integer>{

}

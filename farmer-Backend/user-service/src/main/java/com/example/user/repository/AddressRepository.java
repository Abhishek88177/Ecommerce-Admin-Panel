package com.example.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.user.model.Address;

public interface AddressRepository extends JpaRepository<Address, Integer>{

}

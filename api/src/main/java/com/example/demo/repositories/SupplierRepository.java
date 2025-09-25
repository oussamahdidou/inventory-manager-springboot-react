package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.Supplier;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {

}

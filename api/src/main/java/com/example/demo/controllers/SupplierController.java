package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dtos.supplier.CreateSupplierDto;
import com.example.demo.dtos.supplier.UpdateSupplierDto;
import com.example.demo.models.Supplier;
import com.example.demo.services.supplier.ISupplierService;

@RestController
@RequestMapping("/Api/Supplier/")
public class SupplierController {

    @Autowired
    private final ISupplierService supplierService;

    public SupplierController(ISupplierService supplierService) {
        this.supplierService = supplierService;
    }

    @GetMapping("GetAllSuppliers")
    public ResponseEntity<List<Supplier>> getAllSuppliers() {
        return ResponseEntity.ok(supplierService.getAllSuppliers());
    }

    @GetMapping("GetSupplierById/{id}")
    public ResponseEntity<Supplier> getSupplierById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(supplierService.getSupplierById(id));
    }

    @PostMapping("CreateSupplier")
    public ResponseEntity<Supplier> createSupplier(@RequestBody CreateSupplierDto dto) {
        return ResponseEntity.ok(supplierService.createSupplier(dto));
    }

    @PutMapping("UpdateSupplier/{id}")
    public ResponseEntity<Supplier> updateSupplier(@PathVariable("id") Long id,
                                                   @RequestBody UpdateSupplierDto dto) {
        return ResponseEntity.ok(supplierService.updateSupplier(dto, id));
    }
}

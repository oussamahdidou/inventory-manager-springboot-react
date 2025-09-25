package com.example.demo.services.supplier;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dtos.supplier.CreateSupplierDto;
import com.example.demo.dtos.supplier.UpdateSupplierDto;
import com.example.demo.models.Supplier;
import com.example.demo.repositories.SupplierRepository;

@Service
public class SupplierService implements ISupplierService {
    @Autowired
    private final SupplierRepository supplierRepository;

    public SupplierService(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    @Override
    public Supplier createSupplier(CreateSupplierDto createDto) {
        Supplier supplier = new Supplier();
        supplier.setName(createDto.getName());
        supplier.setAddress(createDto.getAddress());
        supplier.setContact(createDto.getContact());
        supplier.setPhone(createDto.getPhone());
        return supplierRepository.save(supplier);
    }

    @Override
    public Supplier updateSupplier(UpdateSupplierDto updateDto, Long id) {
        Supplier supplier = supplierRepository.findById(id).orElseThrow();
        supplier.setName(updateDto.getName());
        supplier.setAddress(updateDto.getAddress());
        supplier.setContact(updateDto.getContact());
        supplier.setPhone(updateDto.getPhone());
        return supplierRepository.save(supplier);
    }

    @Override
    public List<Supplier> getAllSuppliers() {
        return supplierRepository.findAll();
    }

    @Override
    public Supplier getSupplierById(Long id) {
        return supplierRepository.findById(id).orElseThrow();
    }
}

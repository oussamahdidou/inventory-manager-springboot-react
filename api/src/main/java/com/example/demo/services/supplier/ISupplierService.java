package com.example.demo.services.supplier;

import java.util.List;

import com.example.demo.dtos.supplier.CreateSupplierDto;
import com.example.demo.dtos.supplier.UpdateSupplierDto;
import com.example.demo.models.Supplier;

public interface ISupplierService {
    Supplier createSupplier(CreateSupplierDto createSupplierDto);

    Supplier updateSupplier(UpdateSupplierDto updateSupplierDto, Long id);

    List<Supplier> getAllSuppliers();

    Supplier getSupplierById(Long id);
}

package com.example.demo.dtos.supplier;

import lombok.Data;

@Data
public class CreateSupplierDto {
    private String name;
    private String contact;
    private String address;
    private String phone;
}

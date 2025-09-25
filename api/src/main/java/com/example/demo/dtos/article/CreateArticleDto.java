package com.example.demo.dtos.article;

import lombok.Data;

@Data
public class CreateArticleDto {
    private String name;
    private String description;
    private int quantity;
    private double price;
    private Long categoryId;
    private Long supplierId;
    private String barcode;
}

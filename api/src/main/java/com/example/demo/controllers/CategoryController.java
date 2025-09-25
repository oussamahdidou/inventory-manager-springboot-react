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

import com.example.demo.dtos.category.CreateCategoryDto;
import com.example.demo.dtos.category.UpdateCategoryDto;
import com.example.demo.models.Category;
import com.example.demo.services.category.ICategoryService;

@RestController
@RequestMapping("/Api/Category/")
public class CategoryController {

    @Autowired
    private final ICategoryService categoryService;

    public CategoryController(ICategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("GetAllCategorys")
    public ResponseEntity<List<Category>> getAllCategorys() {
        return ResponseEntity.ok(categoryService.getAllCategorys());
    }

    @GetMapping("GetCategoryById/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(categoryService.getCategoryById(id));
    }

    @PostMapping("CreateCategory")
    public ResponseEntity<Category> createCategory(@RequestBody CreateCategoryDto categoryDto) {
        return ResponseEntity.ok(categoryService.createCategory(categoryDto));
    }

    @PutMapping("UpdateCategory/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable("id") Long id,
            @RequestBody UpdateCategoryDto categoryDto) {
        return ResponseEntity.ok(categoryService.updateCategory(categoryDto, id));
    }
}

package com.example.demo.services.category;

import java.util.List;

import com.example.demo.dtos.category.CreateCategoryDto;
import com.example.demo.dtos.category.UpdateCategoryDto;
import com.example.demo.models.Category;

public interface ICategoryService {
    Category createCategory(CreateCategoryDto createCategoryDto);

    Category updateCategory(UpdateCategoryDto updateCategoryDto, Long id);

    List<Category> getAllCategorys();

    Category getCategoryById(Long id);
}

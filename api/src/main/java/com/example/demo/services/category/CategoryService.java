package com.example.demo.services.category;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dtos.category.CreateCategoryDto;
import com.example.demo.dtos.category.UpdateCategoryDto;
import com.example.demo.models.Category;
import com.example.demo.repositories.CategoryRepository;

@Service
public class CategoryService implements ICategoryService {

    @Autowired
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Category createCategory(CreateCategoryDto createCategoryDto) {
        Category category = new Category();
        category.setName(createCategoryDto.getName());
        category.setDescription(createCategoryDto.getDescription());
        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(UpdateCategoryDto updateCategoryDto, Long id) {
        Category category = categoryRepository.findById(id).orElseThrow();
        category.setName(updateCategoryDto.getName());
        category.setDescription(updateCategoryDto.getDescription());
        return categoryRepository.save(category);
    }

    @Override
    public List<Category> getAllCategorys() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id).orElseThrow();
    }
}

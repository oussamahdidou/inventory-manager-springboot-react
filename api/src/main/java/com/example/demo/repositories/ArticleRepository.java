package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.Article;
import com.example.demo.models.Category;
import com.example.demo.models.Supplier;

public interface ArticleRepository extends JpaRepository<Article, Long> {

    List<Article> findByCategory(Category category);

    List<Article> findBySupplier(Supplier supplier);

    long countByQuantityLessThanEqual(Integer quantity);

    List<Article> findByQuantityLessThanEqual(Integer quantity);
}

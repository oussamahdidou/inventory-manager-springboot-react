package com.example.demo.services.article;

import com.example.demo.dtos.article.CreateArticleDto;
import com.example.demo.dtos.article.UpdateArticleDto;
import com.example.demo.models.Article;

import java.util.List;

public interface IArticleService {
    Article createArticle(CreateArticleDto createArticleDto);
    Article updateArticle(UpdateArticleDto updateArticleDto, Long id);
    List<Article> getAllArticles();
    List<Article> getAllArticlesByCategory(Long id);
    List<Article> getAllArticlesBySupplier(Long id);
}

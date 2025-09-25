package com.example.demo.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dtos.article.CreateArticleDto;
import com.example.demo.dtos.article.UpdateArticleDto;
import com.example.demo.models.Article;
import com.example.demo.services.article.IArticleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/Api/Article/")
public class ArticleController {
    
    @Autowired
    private final IArticleService articleService;

    public ArticleController(IArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping("GetAllArticles")
    public ResponseEntity<List<Article>> getAllArticles() {
        return ResponseEntity.ok(articleService.getAllArticles());
    }

    @GetMapping("GetArticlesByCategory/{id}")
    public ResponseEntity<List<Article>> getArticlesByCategory(@PathVariable("id") Long id) {
        return ResponseEntity.ok(articleService.getAllArticlesByCategory(id));
    }

    @GetMapping("GetArticlesBySupplier/{id}")
    public ResponseEntity<List<Article>> getArticlesBySupplier(@PathVariable("id") Long id) {
        return ResponseEntity.ok(articleService.getAllArticlesBySupplier(id));
    }

    @PostMapping("CreateArticle")
    public ResponseEntity<Article> createArticle(@RequestBody CreateArticleDto articleDto) {
        return ResponseEntity.ok(articleService.createArticle(articleDto));
    }

    @PutMapping("UpdateArticle/{id}")
    public ResponseEntity<Article> updateArticle(@PathVariable("id") Long id, @RequestBody UpdateArticleDto articleDto) {
        return ResponseEntity.ok(articleService.updateArticle(articleDto, id));
    }
}

package com.example.demo.services.article;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dtos.article.CreateArticleDto;
import com.example.demo.dtos.article.UpdateArticleDto;
import com.example.demo.models.Article;
import com.example.demo.models.Category;
import com.example.demo.models.Supplier;
import com.example.demo.repositories.ArticleRepository;
import com.example.demo.repositories.CategoryRepository;
import com.example.demo.repositories.SupplierRepository;

@Service
public class ArticleService implements IArticleService {

    @Autowired
    private final ArticleRepository articleRepository;
    @Autowired
    private final CategoryRepository categoryRepository;
    @Autowired
    private final SupplierRepository supplierRepository;

    public ArticleService(SupplierRepository supplierRepository,
                          ArticleRepository articleRepository,
                          CategoryRepository categoryRepository) {
        this.articleRepository = articleRepository;
        this.categoryRepository = categoryRepository;
        this.supplierRepository = supplierRepository;
    }

    @Override
    public Article createArticle(CreateArticleDto createArticleDto) {
        Article article = new Article();
        article.setName(createArticleDto.getName());
        article.setDescription(createArticleDto.getDescription());
        article.setBarcode(createArticleDto.getBarcode());

        Category category = categoryRepository.findById(createArticleDto.getCategoryId()).orElseThrow();
        article.setCategory(category);

        Supplier supplier = supplierRepository.findById(createArticleDto.getSupplierId()).orElseThrow();
        article.setSupplier(supplier);

        article.setPrice(createArticleDto.getPrice());
        article.setQuantity(createArticleDto.getQuantity());

        return articleRepository.save(article);
    }

    @Override
    public Article updateArticle(UpdateArticleDto updateArticleDto, Long id) {
        Article article = articleRepository.findById(id).orElseThrow();
        article.setName(updateArticleDto.getName());
        article.setDescription(updateArticleDto.getDescription());
        article.setPrice(updateArticleDto.getPrice());
        article.setQuantity(updateArticleDto.getQuantity());

        return articleRepository.save(article);
    }

    @Override
    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    @Override
    public List<Article> getAllArticlesByCategory(Long id) {
        Category category = categoryRepository.findById(id).orElseThrow();
        return articleRepository.findByCategory(category);
    }

    @Override
    public List<Article> getAllArticlesBySupplier(Long id) {
        Supplier supplier = supplierRepository.findById(id).orElseThrow();
        return articleRepository.findBySupplier(supplier);
    }
}

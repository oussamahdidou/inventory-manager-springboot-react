package com.example.demo.services.stockexit;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dtos.stockexit.CreateStockExitDto;
import com.example.demo.dtos.stockexit.UpdateStockExitDto;
import com.example.demo.models.Article;
import com.example.demo.models.StockExit;
import com.example.demo.repositories.ArticleRepository;
import com.example.demo.repositories.StockExitRepository;

@Service
public class StockExitService implements IStockExitService {
    @Autowired
    private final StockExitRepository stockExitRepository;

    @Autowired
    private final ArticleRepository articleRepository;

    public StockExitService(StockExitRepository stockExitRepository, ArticleRepository articleRepository) {
        this.stockExitRepository = stockExitRepository;
        this.articleRepository = articleRepository;
    }

    @Override
    public StockExit createStockExit(CreateStockExitDto CreateStockExitDto) {
        StockExit stockExit = new StockExit();
        stockExit.setDate(CreateStockExitDto.getDate());
        stockExit.setQuantity(CreateStockExitDto.getQuantity());
        stockExit.setDestination(CreateStockExitDto.getDestination());
        Article article = articleRepository.findById(CreateStockExitDto.getArticleId()).orElseThrow();
        int newQuantity = article.getQuantity() - CreateStockExitDto.getQuantity();

        // Check if the new quantity would be less than 0
        if (newQuantity < 0) {
            throw new RuntimeException("Insufficient stock! Article quantity cannot be less than 0.");
        }
        article.setQuantity(newQuantity);
        stockExit.setArticle(article);
        return stockExitRepository.save(stockExit);
    }

    @Override
    public StockExit getStockExitById(Long id) {
        return stockExitRepository.findById(id).orElseThrow();
    }

    @Override
    public List<StockExit> getStockExitByArticle(Long id) {
        Article article = articleRepository.findById(id).orElseThrow();
        return stockExitRepository.findByArticle(article);
    }

    @Override
    public List<StockExit> getAllStockExit() {
        return stockExitRepository.findAll();
    }

    @Override
    public StockExit updateStockExit(UpdateStockExitDto UpdateStockExitDto, Long id) {
        StockExit stockExit = stockExitRepository.findById(id).orElseThrow();
        stockExit.setDate(UpdateStockExitDto.getDate());
        stockExit.setDestination(UpdateStockExitDto.getDestination());
        Article article = stockExit.getArticle();
        article.setQuantity(article.getQuantity() + stockExit.getQuantity());

        int newQuantity = article.getQuantity() - UpdateStockExitDto.getQuantity();

        // Check if the new quantity would be less than 0
        if (newQuantity < 0) {
            throw new RuntimeException("Insufficient stock! Article quantity cannot be less than 0.");
        }
        stockExit.setQuantity(UpdateStockExitDto.getQuantity());
        article.setQuantity(newQuantity);
        articleRepository.save(article);
        return stockExitRepository.save(stockExit);
    }
}

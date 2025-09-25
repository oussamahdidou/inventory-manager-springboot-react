package com.example.demo.services.stockentry;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dtos.stockentry.CreateStockEntryDto;
import com.example.demo.dtos.stockentry.UpdateStockEntryDto;
import com.example.demo.models.Article;
import com.example.demo.models.StockEntry;
import com.example.demo.models.Supplier;
import com.example.demo.repositories.ArticleRepository;
import com.example.demo.repositories.StockEntryRepository;
import com.example.demo.repositories.SupplierRepository;

@Service
public class StockEntryService implements IStockEntryService {
    @Autowired
    private final ArticleRepository articleRepository;
    @Autowired
    private final StockEntryRepository stockEntryRepository;
    @Autowired
    private final SupplierRepository SupplierRepository;

    public StockEntryService(ArticleRepository articleRepository,
                              StockEntryRepository stockEntryRepository,
                              SupplierRepository SupplierRepository) {
        this.articleRepository = articleRepository;
        this.stockEntryRepository = stockEntryRepository;
        this.SupplierRepository = SupplierRepository;
    }

    @Override
    public StockEntry createStockEntry(CreateStockEntryDto createDto) {
        StockEntry stockEntry = new StockEntry();
        stockEntry.setDate(createDto.getDate());
        stockEntry.setQuantity(createDto.getQuantity());

        Article article = articleRepository.findById(createDto.getArticleId()).orElseThrow();
        Supplier Supplier = SupplierRepository.findById(createDto.getSupplierId()).orElseThrow();

        article.setQuantity(article.getQuantity() + createDto.getQuantity());
        articleRepository.save(article);

        stockEntry.setArticle(article);
        stockEntry.setSupplier(Supplier);

        return stockEntryRepository.save(stockEntry);
    }

    @Override
    public StockEntry updateStockEntry(UpdateStockEntryDto updateDto, Long id) {
        StockEntry stockEntry = stockEntryRepository.findById(id).orElseThrow();
        Article article = stockEntry.getArticle();

        article.setQuantity(article.getQuantity() - stockEntry.getQuantity());
        stockEntry.setQuantity(updateDto.getQuantity());
        stockEntry.setDate(updateDto.getDate());
        article.setQuantity(article.getQuantity() + updateDto.getQuantity());

        articleRepository.save(article);
        return stockEntryRepository.save(stockEntry);
    }

    @Override
    public StockEntry getStockEntryById(Long id) {
        return stockEntryRepository.findById(id).orElseThrow();
    }

    @Override
    public List<StockEntry> getStockEntriesByArticle(Long articleId) {
        Article article = articleRepository.findById(articleId).orElseThrow();
        return stockEntryRepository.findByArticle(article);
    }

    @Override
    public List<StockEntry> getStockEntriesBySupplier(Long supplierId) {
        Supplier Supplier = SupplierRepository.findById(supplierId).orElseThrow();
        return stockEntryRepository.findBySupplier(Supplier);
    }

    @Override
    public List<StockEntry> getAllStockEntries() {
        return stockEntryRepository.findAll();
    }
}

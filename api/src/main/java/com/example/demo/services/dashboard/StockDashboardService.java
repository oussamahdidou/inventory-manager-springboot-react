package com.example.demo.services.dashboard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dtos.dashboard.DashboardStats;
import com.example.demo.dtos.dashboard.StockEntryProgressDto;
import com.example.demo.dtos.dashboard.StockExitProgressDto;
import com.example.demo.repositories.ArticleRepository;
import com.example.demo.repositories.CategoryRepository;
import com.example.demo.repositories.StockEntryRepository;
import com.example.demo.repositories.StockExitRepository;
import com.example.demo.repositories.SupplierRepository;

import java.util.*;

@Service
public class StockDashboardService implements IStockDashboardService {
    @Autowired
    private final SupplierRepository SupplierRepository;
    @Autowired
    private final StockEntryRepository stockEntryRepository;
    private final StockExitRepository stockExitRepository;
    @Autowired
    private final ArticleRepository articleRepository;
    @Autowired
    private final CategoryRepository categoryRepository;

    public StockDashboardService(StockExitRepository stockExitRepository, ArticleRepository articleRepository,
            StockEntryRepository stockEntryRepository, CategoryRepository categoryRepository,
            SupplierRepository SupplierRepository) {
        this.SupplierRepository = SupplierRepository;
        this.articleRepository = articleRepository;
        this.categoryRepository = categoryRepository;
        this.stockEntryRepository = stockEntryRepository;
        this.stockExitRepository = stockExitRepository;
    }

    @Override
    public DashboardStats getDashboardStats() {
        DashboardStats dashboardStats = new DashboardStats();
        dashboardStats.setNumberOfSuppliers(SupplierRepository.count());
        dashboardStats.setNumberOfArticles(articleRepository.count());
        dashboardStats.setNumberOfCategorys(categoryRepository.count());
        dashboardStats.setOutOfStock(articleRepository.countByQuantityLessThanEqual(10));
        return dashboardStats;
    }

    @Override
    public List<StockEntryProgressDto> getStockEntryProgress() {
        List<Object[]> result = stockEntryRepository.getStockEntryProgress();
        List<StockEntryProgressDto> progressDTOs = new ArrayList<>();

        for (Object[] row : result) {
            String month = (String) row[0];
            int totalQuantity = ((Number) row[1]).intValue();
            progressDTOs.add(new StockEntryProgressDto(month, totalQuantity));
        }

        return progressDTOs;
    }

    @Override
    public List<StockExitProgressDto> getStockExitProgress() {
        List<Object[]> result = stockExitRepository.getStockExitProgress();
        List<StockExitProgressDto> progressDTOs = new ArrayList<>();

        for (Object[] row : result) {
            String month = (String) row[0];
            int totalQuantity = ((Number) row[1]).intValue();
            progressDTOs.add(new StockExitProgressDto(month, totalQuantity));
        }

        return progressDTOs;
    }
}

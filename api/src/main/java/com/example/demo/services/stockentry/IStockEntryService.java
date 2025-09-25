package com.example.demo.services.stockentry;

import java.util.List;

import com.example.demo.dtos.stockentry.CreateStockEntryDto;
import com.example.demo.dtos.stockentry.UpdateStockEntryDto;
import com.example.demo.models.StockEntry;

public interface IStockEntryService {
    StockEntry createStockEntry(CreateStockEntryDto createDto);

    StockEntry updateStockEntry(UpdateStockEntryDto updateDto, Long id);

    StockEntry getStockEntryById(Long id);

    List<StockEntry> getStockEntriesByArticle(Long articleId);

    List<StockEntry> getStockEntriesBySupplier(Long supplierId);

    List<StockEntry> getAllStockEntries();
}

package com.example.demo.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dtos.stockentry.CreateStockEntryDto;
import com.example.demo.dtos.stockentry.UpdateStockEntryDto;
import com.example.demo.models.StockEntry;
import com.example.demo.services.stockentry.IStockEntryService;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/Api/StockEntry/")
public class StockEntryController {

    private final IStockEntryService stockEntryService;

    public StockEntryController(IStockEntryService stockEntryService) {
        this.stockEntryService = stockEntryService;
    }

    @PostMapping("CreateStockEntry")
    public ResponseEntity<StockEntry> createStockEntry(@RequestBody CreateStockEntryDto dto) {
        return ResponseEntity.ok(stockEntryService.createStockEntry(dto));
    }

    @PutMapping("UpdateStockEntry/{id}")
    public ResponseEntity<StockEntry> updateStockEntry(@PathVariable("id") Long id,
                                                       @RequestBody UpdateStockEntryDto dto) {
        return ResponseEntity.ok(stockEntryService.updateStockEntry(dto, id));
    }

    @GetMapping("GetStockEntryById/{id}")
    public ResponseEntity<StockEntry> getStockEntryById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(stockEntryService.getStockEntryById(id));
    }

    @GetMapping("GetStockEntriesBySupplier/{id}")
    public ResponseEntity<List<StockEntry>> getStockEntriesBySupplier(@PathVariable("id") Long id) {
        return ResponseEntity.ok(stockEntryService.getStockEntriesBySupplier(id));
    }

    @GetMapping("GetStockEntriesByArticle/{id}")
    public ResponseEntity<List<StockEntry>> getStockEntriesByArticle(@PathVariable("id") Long id) {
        return ResponseEntity.ok(stockEntryService.getStockEntriesByArticle(id));
    }

    @GetMapping("GetAllStockEntries")
    public ResponseEntity<List<StockEntry>> getAllStockEntries() {
        return ResponseEntity.ok(stockEntryService.getAllStockEntries());
    }
}

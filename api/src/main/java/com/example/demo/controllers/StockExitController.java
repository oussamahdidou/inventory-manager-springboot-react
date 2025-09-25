package com.example.demo.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dtos.stockexit.CreateStockExitDto;
import com.example.demo.dtos.stockexit.UpdateStockExitDto;
import com.example.demo.models.StockExit;
import com.example.demo.services.stockexit.IStockExitService;

@RestController
@RequestMapping("/Api/StockExit/")
public class StockExitController {

    private final IStockExitService stockExitService;

    public StockExitController(IStockExitService stockExitService) {
        this.stockExitService = stockExitService;
    }

    @PostMapping("CreateStockExit")
    public ResponseEntity<StockExit> createStockExit(@RequestBody CreateStockExitDto createStockExitDto) {
        return ResponseEntity.ok(stockExitService.createStockExit(createStockExitDto));
    }

    @PutMapping("UpdateStockExit/{id}")
    public ResponseEntity<StockExit> updateStockExit(@PathVariable("id") Long id,
            @RequestBody UpdateStockExitDto stockExitDto) {
        return ResponseEntity.ok(stockExitService.updateStockExit(stockExitDto, id));
    }

    @GetMapping("GetStockExitById/{id}")
    public ResponseEntity<StockExit> getStockExitById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(stockExitService.getStockExitById(id));
    }

    @GetMapping("GetStockExitByArticle/{id}")
    public ResponseEntity<List<StockExit>> getStockExitByArticle(@PathVariable("id") Long id) {
        return ResponseEntity.ok(stockExitService.getStockExitByArticle(id));
    }

    @GetMapping("GetAllStockExit")
    public ResponseEntity<List<StockExit>> getAllStockExit() {
        return ResponseEntity.ok(stockExitService.getAllStockExit());
    }
}

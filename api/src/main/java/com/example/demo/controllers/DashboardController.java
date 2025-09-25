package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dtos.dashboard.StockEntryProgressDto;
import com.example.demo.dtos.dashboard.DashboardStats;
import com.example.demo.dtos.dashboard.StockExitProgressDto;
import com.example.demo.services.dashboard.IStockDashboardService;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.List;

@RestController
@RequestMapping("/Api/Dashboard/")
public class DashboardController {

    @Autowired
    private final IStockDashboardService dashboardService;

    public DashboardController(IStockDashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("GetDashboardStats")
    public ResponseEntity<DashboardStats> getDashboardStats() {
        return ResponseEntity.ok(dashboardService.getDashboardStats());
    }

    @GetMapping("GetEntriesProgress")
    public ResponseEntity<List<StockEntryProgressDto>> getEntriesProgress() {
        return ResponseEntity.ok(dashboardService.getStockEntryProgress());
    }

    @GetMapping("GetExitProgress")
    public ResponseEntity<List<StockExitProgressDto>> getExitProgress() {
        return ResponseEntity.ok(dashboardService.getStockExitProgress());
    }
}

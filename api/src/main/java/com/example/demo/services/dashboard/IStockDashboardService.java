package com.example.demo.services.dashboard;

import com.example.demo.dtos.dashboard.DashboardStats;
import com.example.demo.dtos.dashboard.StockEntryProgressDto;
import com.example.demo.dtos.dashboard.StockExitProgressDto;

import java.util.List;

public interface IStockDashboardService {
    DashboardStats getDashboardStats();

    List<StockEntryProgressDto> getStockEntryProgress();

    List<StockExitProgressDto> getStockExitProgress();
}

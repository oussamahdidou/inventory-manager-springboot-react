package com.example.demo.services.stockexit;

import java.util.List;

import com.example.demo.dtos.stockexit.CreateStockExitDto;
import com.example.demo.dtos.stockexit.UpdateStockExitDto;
import com.example.demo.models.StockExit;

public interface IStockExitService {
    StockExit createStockExit(CreateStockExitDto createStockExitDto);

    StockExit getStockExitById(Long id);

    List<StockExit> getStockExitByArticle(Long id);

    List<StockExit> getAllStockExit();

    StockExit updateStockExit(UpdateStockExitDto updateStockExitDto, Long id);
}

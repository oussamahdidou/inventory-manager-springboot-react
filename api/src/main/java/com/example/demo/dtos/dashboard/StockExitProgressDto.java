package com.example.demo.dtos.dashboard;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StockExitProgressDto {
    private String month;
    private int totalQuantity;
}

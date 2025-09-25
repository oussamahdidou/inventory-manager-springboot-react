package com.example.demo.dtos.stockentry;

import java.util.Date;
import lombok.Data;

@Data
public class UpdateStockEntryDto {
    private int quantity;
    private Date date;
}

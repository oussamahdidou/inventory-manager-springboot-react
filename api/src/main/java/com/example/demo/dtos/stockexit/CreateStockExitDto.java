package com.example.demo.dtos.stockexit;

import java.util.Date;
import lombok.Data;

@Data
public class CreateStockExitDto {
    private Long articleId;

    private int quantity;
    private Date date;
    private String destination;
}

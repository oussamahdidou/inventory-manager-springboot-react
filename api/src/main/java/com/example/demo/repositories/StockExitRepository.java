package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.models.Article;
import com.example.demo.models.StockExit;

public interface StockExitRepository extends JpaRepository<StockExit, Long> {
    List<StockExit> findByArticle(Article article);

    @Query(value = """
            WITH LastFiveMonths AS (
                SELECT
                    DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '1 month' * generate_series(0, 4) AS month_start
            )
            SELECT
                to_char(month_start, 'YYYY-MM') AS month,
                COALESCE(SUM(e.quantity), 0) AS totalQuantity
            FROM
                LastFiveMonths m
            LEFT JOIN
                stock_exit e ON DATE_TRUNC('month', e.date) = m.month_start
            GROUP BY
                month_start
            ORDER BY
                month_start;
            """, nativeQuery = true)
    List<Object[]> getStockExitProgress();
}

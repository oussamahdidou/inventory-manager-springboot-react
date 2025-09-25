package com.example.demo.services.scheduledtask;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.example.demo.models.Article;
import com.example.demo.models.Message;
import com.example.demo.repositories.ArticleRepository;
import com.example.demo.repositories.MessageRepository;

@Service
public class ScheduledTaskService implements IScheduledTaskService {
    @Autowired
    private final ArticleRepository articleRepository;
    @Autowired
    private final MessageRepository messageRepository;

    public ScheduledTaskService(ArticleRepository articleRepository, MessageRepository messageRepository,
                                 MessageRepository messageRepository2) {
        this.articleRepository = articleRepository;
        this.messageRepository = messageRepository2;
    }

    @Override
    @Scheduled(cron = "0 0 8 * * *")
    public void checkDepletedStock() {
        List<Article> articles = articleRepository.findByQuantityLessThanEqual(10);
        for (Article article : articles) {
            Message message = new Message();
            message.setRead(false);
            message.setContent("Item: " + article.getName() +
                    "\nThe item " + article.getName() + " is currently out of stock." +
                    "\nWe recommend taking the following actions:" +
                    "\n\n1. Notify the supplier for a quick restock." +
                    "\n2. Check for available alternatives to offer similar items." +
                    "\n3. Follow notifications to be informed when the item is back in stock." +
                    "\n\nWe will keep you updated as soon as the item is restocked.");
            message.setTitle("Item " + article.getName() + " is currently out of stock.");
            messageRepository.save(message);
        }
    }
}

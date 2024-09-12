package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Message;
import com.example.demo.services.message.MessageService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/Api/Message/")
public class MessageController {
    @Autowired
    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("GetAllMessages")
    public ResponseEntity<List<Message>> GetAllMessages() {
        return ResponseEntity.ok(messageService.GetAllMessages());
    }

    @GetMapping("GetAllReadMessages")
    public ResponseEntity<List<Message>> GetAllReadMessages() {
        return ResponseEntity.ok(messageService.GetAllReadMessages());
    }

    @GetMapping("GetMessageById/{id}")
    public ResponseEntity<Message> GetMessageById(@PathVariable Long id) {
        return ResponseEntity.ok(messageService.GetMessageById(id));
    }

    @PutMapping("MarkAsRead/{id}")
    public ResponseEntity<Message> MarkAsRead(@PathVariable Long id) {
        return ResponseEntity.ok(messageService.MarkAsRead(id));

    }

    @GetMapping("CountRead")
    public ResponseEntity<Long> CountRead() {
        return ResponseEntity.ok(messageService.CountReadMessages());
    }
}

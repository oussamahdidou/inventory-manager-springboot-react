package com.example.demo.services.message;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.models.Message;
import com.example.demo.repositories.MessageRepository;

@Service
public class MessageService implements IMessageService {
    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @Override
    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    @Override
    public List<Message> getAllReadMessages() {
        return messageRepository.findByIsRead(true);
    }

    @Override
    public Message markAsRead(Long id) {
        Message message = messageRepository.findById(id).orElseThrow();
        message.setRead(true);
        return messageRepository.save(message);
    }

    @Override
    public Message getMessageById(Long id) {
        return messageRepository.findById(id).orElseThrow();
    }

    @Override
    public long countUnreadMessages() {
        return messageRepository.countByIsRead(false);
    }
}

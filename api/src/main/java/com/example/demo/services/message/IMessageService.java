package com.example.demo.services.message;

import java.util.List;

import com.example.demo.models.Message;

public interface IMessageService {
    List<Message> getAllMessages();

    List<Message> getAllReadMessages();

    Message markAsRead(Long id);

    Message getMessageById(Long id);

    long countUnreadMessages();
}

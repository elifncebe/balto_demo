package com.baltotest.adapter.controller;

import com.baltotest.application.dto.MessageRequest;
import com.baltotest.application.dto.MessageResponse;
import com.baltotest.application.usecase.MessageUseCase;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageUseCase messageUseCase;

    public MessageController(MessageUseCase messageUseCase) {
        this.messageUseCase = messageUseCase;
    }

    @PostMapping
    public ResponseEntity<MessageResponse> sendMessage(@RequestBody MessageRequest request) {
        return ResponseEntity.ok(messageUseCase.sendMessage(request));
    }

    @GetMapping("/{messageId}")
    public ResponseEntity<MessageResponse> getMessage(@PathVariable UUID messageId) {
        return ResponseEntity.ok(messageUseCase.getMessage(messageId));
    }

    @GetMapping("/load/{loadId}")
    public ResponseEntity<List<MessageResponse>> getMessagesByLoad(@PathVariable UUID loadId) {
        return ResponseEntity.ok(messageUseCase.getMessagesByLoad(loadId));
    }

    @GetMapping("/sender/{senderId}")
    public ResponseEntity<List<MessageResponse>> getMessagesBySender(@PathVariable UUID senderId) {
        return ResponseEntity.ok(messageUseCase.getMessagesBySender(senderId));
    }

    @GetMapping("/recipient/{recipientId}")
    public ResponseEntity<List<MessageResponse>> getMessagesByRecipient(@PathVariable UUID recipientId) {
        return ResponseEntity.ok(messageUseCase.getMessagesByRecipient(recipientId));
    }

    @GetMapping("/channel/{channelId}")
    public ResponseEntity<List<MessageResponse>> getMessagesByChannel(@PathVariable UUID channelId) {
        return ResponseEntity.ok(messageUseCase.getMessagesByChannel(channelId));
    }

    @GetMapping("/unread/recipient/{recipientId}")
    public ResponseEntity<List<MessageResponse>> getUnreadMessagesByRecipient(@PathVariable UUID recipientId) {
        return ResponseEntity.ok(messageUseCase.getUnreadMessagesByRecipient(recipientId));
    }

    @GetMapping("/unread/load/{loadId}")
    public ResponseEntity<List<MessageResponse>> getUnreadMessagesByLoad(@PathVariable UUID loadId) {
        return ResponseEntity.ok(messageUseCase.getUnreadMessagesByLoad(loadId));
    }

    @GetMapping("/unread/count/{recipientId}")
    public ResponseEntity<Long> countUnreadMessagesByRecipient(@PathVariable UUID recipientId) {
        return ResponseEntity.ok(messageUseCase.countUnreadMessagesByRecipient(recipientId));
    }

    @PutMapping("/{messageId}/read")
    public ResponseEntity<MessageResponse> markAsRead(@PathVariable UUID messageId) {
        return ResponseEntity.ok(messageUseCase.markAsRead(messageId));
    }

    @DeleteMapping("/{messageId}")
    public ResponseEntity<Void> deleteMessage(@PathVariable UUID messageId) {
        messageUseCase.deleteMessage(messageId);
        return ResponseEntity.noContent().build();
    }
}
package com.baltotest.domain.port;

import com.baltotest.domain.entity.Channel;
import com.baltotest.domain.entity.Load;
import com.baltotest.domain.entity.Message;
import com.baltotest.domain.entity.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MessageRepositoryPort {
    Message save(Message message);
    Optional<Message> findById(UUID id);
    List<Message> findByLoad(Load load);
    List<Message> findBySender(User sender);
    List<Message> findByRecipient(User recipient);
    List<Message> findByChannel(Channel channel);
    List<Message> findByLoadAndRead(Load load, boolean read);
    List<Message> findByRecipientAndRead(User recipient, boolean read);
    long countUnreadByRecipient(User recipient);
    void delete(Message message);
}
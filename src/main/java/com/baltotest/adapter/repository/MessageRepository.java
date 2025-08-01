package com.baltotest.adapter.repository;

import com.baltotest.domain.entity.Channel;
import com.baltotest.domain.entity.Load;
import com.baltotest.domain.entity.Message;
import com.baltotest.domain.entity.User;
import com.baltotest.domain.port.MessageRepositoryPort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MessageRepository extends JpaRepository<Message, UUID>, MessageRepositoryPort {
    List<Message> findByLoad(Load load);
    List<Message> findBySender(User sender);
    List<Message> findByRecipient(User recipient);
    List<Message> findByChannel(Channel channel);
    List<Message> findByLoadAndRead(Load load, boolean read);
    List<Message> findByRecipientAndRead(User recipient, boolean read);
    
    @Query("SELECT COUNT(m) FROM Message m WHERE m.recipient = :recipient AND m.read = false")
    long countUnreadByRecipient(@Param("recipient") User recipient);
}
package com.baltotest.domain.port;

import com.baltotest.domain.entity.Channel;
import com.baltotest.domain.entity.ChannelType;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ChannelRepositoryPort {
    Channel save(Channel channel);
    Optional<Channel> findById(UUID id);
    List<Channel> findByType(ChannelType type);
    List<Channel> findByActive(boolean active);
    List<Channel> findAll();
    void delete(Channel channel);
}
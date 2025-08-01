package com.baltotest.adapter.repository;

import com.baltotest.domain.entity.Channel;
import com.baltotest.domain.entity.ChannelType;
import com.baltotest.domain.port.ChannelRepositoryPort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ChannelRepository extends JpaRepository<Channel, UUID>, ChannelRepositoryPort {
    List<Channel> findByType(ChannelType type);
    List<Channel> findByActive(boolean active);
}
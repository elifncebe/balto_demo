package com.baltotest.application.service;

import com.baltotest.application.dto.ChannelRequest;
import com.baltotest.application.dto.ChannelResponse;
import com.baltotest.application.usecase.ChannelUseCase;
import com.baltotest.domain.entity.Channel;
import com.baltotest.domain.entity.ChannelType;
import com.baltotest.domain.port.ChannelRepositoryPort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ChannelService implements ChannelUseCase {

    private final ChannelRepositoryPort channelRepository;

    public ChannelService(ChannelRepositoryPort channelRepository) {
        this.channelRepository = channelRepository;
    }

    @Override
    public ChannelResponse createChannel(ChannelRequest request) {
        Channel channel = new Channel();
        channel.setType(request.type);
        channel.setName(request.name);
        channel.setDescription(request.description);
        channel.setConfiguration(request.configuration);
        channel.setActive(request.active);
        
        Channel savedChannel = channelRepository.save(channel);
        return mapToChannelResponse(savedChannel);
    }

    @Override
    public ChannelResponse getChannel(UUID channelId) {
        Channel channel = channelRepository.findById(channelId)
                .orElseThrow(() -> new RuntimeException("Channel not found"));
        return mapToChannelResponse(channel);
    }

    @Override
    public List<ChannelResponse> getAllChannels() {
        return channelRepository.findAll().stream()
                .map(this::mapToChannelResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ChannelResponse> getChannelsByType(ChannelType type) {
        return channelRepository.findByType(type).stream()
                .map(this::mapToChannelResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ChannelResponse> getActiveChannels() {
        return channelRepository.findByActive(true).stream()
                .map(this::mapToChannelResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ChannelResponse updateChannel(UUID channelId, ChannelRequest request) {
        Channel channel = channelRepository.findById(channelId)
                .orElseThrow(() -> new RuntimeException("Channel not found"));
        
        channel.setType(request.type);
        channel.setName(request.name);
        channel.setDescription(request.description);
        channel.setConfiguration(request.configuration);
        channel.setActive(request.active);
        
        Channel updatedChannel = channelRepository.save(channel);
        return mapToChannelResponse(updatedChannel);
    }

    @Override
    public ChannelResponse activateChannel(UUID channelId) {
        Channel channel = channelRepository.findById(channelId)
                .orElseThrow(() -> new RuntimeException("Channel not found"));
        channel.setActive(true);
        Channel updatedChannel = channelRepository.save(channel);
        return mapToChannelResponse(updatedChannel);
    }

    @Override
    public ChannelResponse deactivateChannel(UUID channelId) {
        Channel channel = channelRepository.findById(channelId)
                .orElseThrow(() -> new RuntimeException("Channel not found"));
        channel.setActive(false);
        Channel updatedChannel = channelRepository.save(channel);
        return mapToChannelResponse(updatedChannel);
    }

    @Override
    public void deleteChannel(UUID channelId) {
        Channel channel = channelRepository.findById(channelId)
                .orElseThrow(() -> new RuntimeException("Channel not found"));
        channelRepository.delete(channel);
    }
    
    private ChannelResponse mapToChannelResponse(Channel channel) {
        ChannelResponse response = new ChannelResponse();
        response.id = channel.getId();
        response.type = channel.getType();
        response.name = channel.getName();
        response.description = channel.getDescription();
        response.configuration = channel.getConfiguration();
        response.active = channel.isActive();
        response.createdAt = channel.getCreatedAt();
        response.updatedAt = channel.getUpdatedAt();
        return response;
    }
}
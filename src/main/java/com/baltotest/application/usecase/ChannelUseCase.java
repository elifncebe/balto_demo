package com.baltotest.application.usecase;

import com.baltotest.application.dto.ChannelRequest;
import com.baltotest.application.dto.ChannelResponse;
import com.baltotest.domain.entity.ChannelType;

import java.util.List;
import java.util.UUID;

public interface ChannelUseCase {
    ChannelResponse createChannel(ChannelRequest request);
    ChannelResponse getChannel(UUID channelId);
    List<ChannelResponse> getAllChannels();
    List<ChannelResponse> getChannelsByType(ChannelType type);
    List<ChannelResponse> getActiveChannels();
    ChannelResponse updateChannel(UUID channelId, ChannelRequest request);
    ChannelResponse activateChannel(UUID channelId);
    ChannelResponse deactivateChannel(UUID channelId);
    void deleteChannel(UUID channelId);
}
package com.baltotest.adapter.controller;

import com.baltotest.application.dto.ApiResponse;
import com.baltotest.application.dto.ChannelRequest;
import com.baltotest.application.dto.ChannelResponse;
import com.baltotest.application.usecase.ChannelUseCase;
import com.baltotest.domain.entity.ChannelType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/channels")
public class ChannelController {

    private final ChannelUseCase channelUseCase;

    public ChannelController(ChannelUseCase channelUseCase) {
        this.channelUseCase = channelUseCase;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ChannelResponse>> createChannel(@RequestBody ChannelRequest request) {
        return ResponseEntity.ok(ApiResponse.success(channelUseCase.createChannel(request)));
    }

    @GetMapping("/{channelId}")
    public ResponseEntity<ApiResponse<ChannelResponse>> getChannel(@PathVariable UUID channelId) {
        return ResponseEntity.ok(ApiResponse.success(channelUseCase.getChannel(channelId)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ChannelResponse>>> getAllChannels() {
        return ResponseEntity.ok(ApiResponse.success(channelUseCase.getAllChannels()));
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<ApiResponse<List<ChannelResponse>>> getChannelsByType(@PathVariable ChannelType type) {
        return ResponseEntity.ok(ApiResponse.success(channelUseCase.getChannelsByType(type)));
    }

    @GetMapping("/active")
    public ResponseEntity<ApiResponse<List<ChannelResponse>>> getActiveChannels() {
        return ResponseEntity.ok(ApiResponse.success(channelUseCase.getActiveChannels()));
    }

    @PutMapping("/{channelId}")
    public ResponseEntity<ApiResponse<ChannelResponse>> updateChannel(
            @PathVariable UUID channelId,
            @RequestBody ChannelRequest request) {
        return ResponseEntity.ok(ApiResponse.success(channelUseCase.updateChannel(channelId, request)));
    }

    @PutMapping("/{channelId}/activate")
    public ResponseEntity<ApiResponse<ChannelResponse>> activateChannel(@PathVariable UUID channelId) {
        return ResponseEntity.ok(ApiResponse.success(channelUseCase.activateChannel(channelId)));
    }

    @PutMapping("/{channelId}/deactivate")
    public ResponseEntity<ApiResponse<ChannelResponse>> deactivateChannel(@PathVariable UUID channelId) {
        return ResponseEntity.ok(ApiResponse.success(channelUseCase.deactivateChannel(channelId)));
    }

    @DeleteMapping("/{channelId}")
    public ResponseEntity<ApiResponse<Void>> deleteChannel(@PathVariable UUID channelId) {
        channelUseCase.deleteChannel(channelId);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
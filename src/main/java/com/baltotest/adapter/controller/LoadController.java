package com.baltotest.adapter.controller;

import com.baltotest.application.dto.LoadRequest;
import com.baltotest.application.dto.LoadResponse;
import com.baltotest.application.usecase.LoadUseCase;
import com.baltotest.domain.entity.LoadStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/loads")
public class LoadController {

    private final LoadUseCase loadUseCase;

    public LoadController(LoadUseCase loadUseCase) {
        this.loadUseCase = loadUseCase;
    }

    @PostMapping
    public ResponseEntity<LoadResponse> createLoad(@RequestBody LoadRequest request) {
        return ResponseEntity.ok(loadUseCase.createLoad(request));
    }

    @GetMapping("/{loadId}")
    public ResponseEntity<LoadResponse> getLoad(@PathVariable UUID loadId) {
        return ResponseEntity.ok(loadUseCase.getLoad(loadId));
    }

    @GetMapping("/broker/{brokerId}")
    public ResponseEntity<List<LoadResponse>> getLoadsByBroker(@PathVariable UUID brokerId) {
        return ResponseEntity.ok(loadUseCase.getLoadsByBroker(brokerId));
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<LoadResponse>> getLoadsByCustomer(@PathVariable UUID customerId) {
        return ResponseEntity.ok(loadUseCase.getLoadsByCustomer(customerId));
    }

    @GetMapping("/carrier/{carrierId}")
    public ResponseEntity<List<LoadResponse>> getLoadsByCarrier(@PathVariable UUID carrierId) {
        return ResponseEntity.ok(loadUseCase.getLoadsByCarrier(carrierId));
    }

    @PutMapping("/{loadId}")
    public ResponseEntity<LoadResponse> updateLoad(
            @PathVariable UUID loadId,
            @RequestBody LoadRequest request) {
        return ResponseEntity.ok(loadUseCase.updateLoad(loadId, request));
    }

    @PutMapping("/{loadId}/status")
    public ResponseEntity<LoadResponse> updateLoadStatus(
            @PathVariable UUID loadId,
            @RequestParam LoadStatus status) {
        return ResponseEntity.ok(loadUseCase.updateLoadStatus(loadId, status));
    }

    @PutMapping("/{loadId}/eta")
    public ResponseEntity<LoadResponse> updateEstimatedDeliveryDate(
            @PathVariable UUID loadId,
            @RequestParam LocalDateTime estimatedDeliveryDate) {
        return ResponseEntity.ok(loadUseCase.updateEstimatedDeliveryDate(loadId, estimatedDeliveryDate));
    }

    @PutMapping("/{loadId}/carrier/{carrierId}")
    public ResponseEntity<LoadResponse> assignCarrier(
            @PathVariable UUID loadId,
            @PathVariable UUID carrierId) {
        return ResponseEntity.ok(loadUseCase.assignCarrier(loadId, carrierId));
    }

    @DeleteMapping("/{loadId}")
    public ResponseEntity<Void> deleteLoad(@PathVariable UUID loadId) {
        loadUseCase.deleteLoad(loadId);
        return ResponseEntity.noContent().build();
    }
}
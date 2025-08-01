package com.baltotest.application.usecase;

import com.baltotest.application.dto.LoadRequest;
import com.baltotest.application.dto.LoadResponse;
import com.baltotest.domain.entity.LoadStatus;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface LoadUseCase {
    LoadResponse createLoad(LoadRequest request);
    LoadResponse getLoad(UUID loadId);
    List<LoadResponse> getLoadsByBroker(UUID brokerId);
    List<LoadResponse> getLoadsByCustomer(UUID customerId);
    List<LoadResponse> getLoadsByCarrier(UUID carrierId);
    LoadResponse updateLoad(UUID loadId, LoadRequest request);
    LoadResponse updateLoadStatus(UUID loadId, LoadStatus status);
    LoadResponse updateEstimatedDeliveryDate(UUID loadId, LocalDateTime estimatedDeliveryDate);
    LoadResponse assignCarrier(UUID loadId, UUID carrierId);
    void deleteLoad(UUID loadId);
}
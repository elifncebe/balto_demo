package com.baltotest.application.service;

import com.baltotest.application.dto.LoadRequest;
import com.baltotest.application.dto.LoadResponse;
import com.baltotest.application.dto.UserResponse;
import com.baltotest.application.usecase.LoadUseCase;
import com.baltotest.domain.entity.Load;
import com.baltotest.domain.entity.LoadStatus;
import com.baltotest.domain.entity.User;
import com.baltotest.domain.port.LoadRepositoryPort;
import com.baltotest.domain.port.UserRepositoryPort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class LoadService implements LoadUseCase {

    private final LoadRepositoryPort loadRepository;
    private final UserRepositoryPort userRepository;

    public LoadService(LoadRepositoryPort loadRepository, UserRepositoryPort userRepository) {
        this.loadRepository = loadRepository;
        this.userRepository = userRepository;
    }

    @Override
    public LoadResponse createLoad(LoadRequest request) {
        User broker = userRepository.findById(request.brokerId)
                .orElseThrow(() -> new RuntimeException("Broker not found"));
        User customer = userRepository.findById(request.customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        
        Load load = new Load();
        load.setOriginAddress(request.originAddress);
        load.setDestinationAddress(request.destinationAddress);
        
        // Use pickupDateTime and deliveryDateTime fields from LoadRequest
        // If they're null, try to convert pickupDate and deliveryEta to LocalDateTime
        if (request.pickupDateTime != null) {
            load.setPickupDate(request.pickupDateTime);
        } else if (request.pickupDate != null) {
            // Convert LocalDate to LocalDateTime (using start of day)
            load.setPickupDate(request.pickupDate.atStartOfDay());
        }
        
        if (request.deliveryDateTime != null) {
            load.setDeliveryDate(request.deliveryDateTime);
        } else if (request.deliveryEta != null) {
            // Convert LocalDate to LocalDateTime (using start of day)
            load.setDeliveryDate(request.deliveryEta.atStartOfDay());
        }
        
        load.setStatus(LoadStatus.PENDING);
        load.setBroker(broker);
        load.setCustomer(customer);
        load.setVehicleDetails(request.vehicleDetails);
        load.setNotes(request.notes);
        
        if (request.carrierId != null) {
            User carrier = userRepository.findById(request.carrierId)
                    .orElseThrow(() -> new RuntimeException("Carrier not found"));
            load.setCarrier(carrier);
            load.setStatus(LoadStatus.ASSIGNED);
        }
        
        Load savedLoad = loadRepository.save(load);
        return mapToLoadResponse(savedLoad);
    }

    @Override
    public LoadResponse getLoad(UUID loadId) {
        Load load = loadRepository.findById(loadId)
                .orElseThrow(() -> new RuntimeException("Load not found"));
        return mapToLoadResponse(load);
    }

    @Override
    public List<LoadResponse> getLoadsByBroker(UUID brokerId) {
        User broker = userRepository.findById(brokerId)
                .orElseThrow(() -> new RuntimeException("Broker not found"));
        return loadRepository.findByBroker(broker).stream()
                .map(this::mapToLoadResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<LoadResponse> getLoadsByCustomer(UUID customerId) {
        User customer = userRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        return loadRepository.findByCustomer(customer).stream()
                .map(this::mapToLoadResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<LoadResponse> getLoadsByCarrier(UUID carrierId) {
        User carrier = userRepository.findById(carrierId)
                .orElseThrow(() -> new RuntimeException("Carrier not found"));
        return loadRepository.findByCarrier(carrier).stream()
                .map(this::mapToLoadResponse)
                .collect(Collectors.toList());
    }

    @Override
    public LoadResponse updateLoad(UUID loadId, LoadRequest request) {
        Load load = loadRepository.findById(loadId)
                .orElseThrow(() -> new RuntimeException("Load not found"));
        
        load.setOriginAddress(request.originAddress);
        load.setDestinationAddress(request.destinationAddress);
        
        // Use pickupDateTime and deliveryDateTime fields from LoadRequest
        // If they're null, try to convert pickupDate and deliveryEta to LocalDateTime
        if (request.pickupDateTime != null) {
            load.setPickupDate(request.pickupDateTime);
        } else if (request.pickupDate != null) {
            // Convert LocalDate to LocalDateTime (using start of day)
            load.setPickupDate(request.pickupDate.atStartOfDay());
        }
        
        if (request.deliveryDateTime != null) {
            load.setDeliveryDate(request.deliveryDateTime);
        } else if (request.deliveryEta != null) {
            // Convert LocalDate to LocalDateTime (using start of day)
            load.setDeliveryDate(request.deliveryEta.atStartOfDay());
        }
        
        load.setVehicleDetails(request.vehicleDetails);
        load.setNotes(request.notes);
        
        if (request.brokerId != null && !request.brokerId.equals(load.getBroker().getId())) {
            User broker = userRepository.findById(request.brokerId)
                    .orElseThrow(() -> new RuntimeException("Broker not found"));
            load.setBroker(broker);
        }
        
        if (request.customerId != null && !request.customerId.equals(load.getCustomer().getId())) {
            User customer = userRepository.findById(request.customerId)
                    .orElseThrow(() -> new RuntimeException("Customer not found"));
            load.setCustomer(customer);
        }
        
        if (request.carrierId != null && (load.getCarrier() == null || !request.carrierId.equals(load.getCarrier().getId()))) {
            User carrier = userRepository.findById(request.carrierId)
                    .orElseThrow(() -> new RuntimeException("Carrier not found"));
            load.setCarrier(carrier);
            if (load.getStatus() == LoadStatus.PENDING) {
                load.setStatus(LoadStatus.ASSIGNED);
            }
        }
        
        Load updatedLoad = loadRepository.save(load);
        return mapToLoadResponse(updatedLoad);
    }

    @Override
    public LoadResponse updateLoadStatus(UUID loadId, LoadStatus status) {
        Load load = loadRepository.findById(loadId)
                .orElseThrow(() -> new RuntimeException("Load not found"));
        load.setStatus(status);
        Load updatedLoad = loadRepository.save(load);
        return mapToLoadResponse(updatedLoad);
    }

    @Override
    public LoadResponse updateEstimatedDeliveryDate(UUID loadId, LocalDateTime estimatedDeliveryDate) {
        Load load = loadRepository.findById(loadId)
                .orElseThrow(() -> new RuntimeException("Load not found"));
        load.setEstimatedDeliveryDate(estimatedDeliveryDate);
        Load updatedLoad = loadRepository.save(load);
        return mapToLoadResponse(updatedLoad);
    }

    @Override
    public LoadResponse assignCarrier(UUID loadId, UUID carrierId) {
        Load load = loadRepository.findById(loadId)
                .orElseThrow(() -> new RuntimeException("Load not found"));
        User carrier = userRepository.findById(carrierId)
                .orElseThrow(() -> new RuntimeException("Carrier not found"));
        
        load.setCarrier(carrier);
        if (load.getStatus() == LoadStatus.PENDING) {
            load.setStatus(LoadStatus.ASSIGNED);
        }
        
        Load updatedLoad = loadRepository.save(load);
        return mapToLoadResponse(updatedLoad);
    }

    @Override
    public void deleteLoad(UUID loadId) {
        Load load = loadRepository.findById(loadId)
                .orElseThrow(() -> new RuntimeException("Load not found"));
        loadRepository.delete(load);
    }
    
    private LoadResponse mapToLoadResponse(Load load) {
        LoadResponse response = new LoadResponse();
        response.id = load.getId();
        response.originAddress = load.getOriginAddress();
        response.destinationAddress = load.getDestinationAddress();
        response.pickupDate = load.getPickupDate();
        response.deliveryDate = load.getDeliveryDate();
        response.estimatedDeliveryDate = load.getEstimatedDeliveryDate();
        response.status = load.getStatus();
        response.vehicleDetails = load.getVehicleDetails();
        response.notes = load.getNotes();
        response.createdAt = load.getCreatedAt();
        response.updatedAt = load.getUpdatedAt();
        
        response.broker = mapToUserResponse(load.getBroker());
        response.customer = mapToUserResponse(load.getCustomer());
        if (load.getCarrier() != null) {
            response.carrier = mapToUserResponse(load.getCarrier());
        }
        
        return response;
    }
    
    private UserResponse mapToUserResponse(User user) {
        return new UserResponse(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getRole()
        );
    }
}
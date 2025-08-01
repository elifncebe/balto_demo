package com.baltotest.domain.port;

import com.baltotest.domain.entity.Load;
import com.baltotest.domain.entity.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface LoadRepositoryPort {
    Load save(Load load);
    Optional<Load> findById(UUID id);
    List<Load> findByBroker(User broker);
    List<Load> findByCustomer(User customer);
    List<Load> findByCarrier(User carrier);
    void delete(Load load);
}
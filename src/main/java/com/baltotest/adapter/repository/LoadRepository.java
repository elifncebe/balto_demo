package com.baltotest.adapter.repository;

import com.baltotest.domain.entity.Load;
import com.baltotest.domain.entity.User;
import com.baltotest.domain.port.LoadRepositoryPort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface LoadRepository extends JpaRepository<Load, UUID>, LoadRepositoryPort {
    List<Load> findByBroker(User broker);
    List<Load> findByCustomer(User customer);
    List<Load> findByCarrier(User carrier);
}
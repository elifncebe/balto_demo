package com.baltotest.domain.repository;

import com.baltotest.domain.dto.UserActivityDto;
import com.baltotest.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface UserActivityRepository extends JpaRepository<User, UUID> {

    @Query("SELECT new com.baltotest.domain.dto.UserActivityDto(u.name, u.role, CAST(COUNT(DISTINCT l) AS int), CAST(COUNT(DISTINCT m) AS int), MAX(m.sentAt)) " +
            "FROM User u " +
            "LEFT JOIN Load l ON l.createdBy.id = u.id " +
            "LEFT JOIN Message m ON m.sender.id = u.id " +
            "GROUP BY u.id, u.name, u.role " +
            "ORDER BY MAX(m.sentAt) DESC")
    List<UserActivityDto> findUserActivity();
    
    @Query("SELECT new com.baltotest.domain.dto.UserActivityDto(u.name, u.role, CAST(COUNT(DISTINCT l) AS int), CAST(COUNT(DISTINCT m) AS int), MAX(m.sentAt)) " +
            "FROM User u " +
            "LEFT JOIN Load l ON l.createdBy.id = u.id " +
            "LEFT JOIN Message m ON m.sender.id = u.id " +
            "WHERE (l.createdAt BETWEEN :startDate AND :endDate OR m.sentAt BETWEEN :startDate AND :endDate) " +
            "GROUP BY u.id, u.name, u.role " +
            "ORDER BY MAX(m.sentAt) DESC")
    List<UserActivityDto> findUserActivityBetweenDates(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
}



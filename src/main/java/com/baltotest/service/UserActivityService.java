package com.baltotest.service;

import com.baltotest.domain.dto.UserActivityDto;
import com.baltotest.domain.repository.UserActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
public class UserActivityService {

    private final UserActivityRepository userActivityRepository;

    @Autowired
    public UserActivityService(UserActivityRepository userActivityRepository) {
        this.userActivityRepository = userActivityRepository;
    }

    public List<UserActivityDto> getAllUserActivity() {
        return userActivityRepository.findUserActivity();
    }

    public List<UserActivityDto> getUserActivityByDateRange(LocalDate startDate, LocalDate endDate) {
        LocalDateTime start = startDate.atStartOfDay();
        LocalDateTime end = endDate.atTime(LocalTime.MAX);
        return userActivityRepository.findUserActivityBetweenDates(start, end);
    }
}

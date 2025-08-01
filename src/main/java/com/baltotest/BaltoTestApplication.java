package com.baltotest;

import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableRabbit
@EntityScan(basePackages = "com.baltotest.domain.entity")
@EnableJpaRepositories(basePackages = "com.baltotest.adapter.repository")
public class BaltoTestApplication {
    public static void main(String[] args) {
        SpringApplication.run(BaltoTestApplication.class, args);
    }
}

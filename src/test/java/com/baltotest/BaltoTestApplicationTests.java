package com.baltotest;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.TestPropertySource;

@SuppressWarnings("removal")
@SpringBootTest(
    classes = BaltoTestApplication.class,
    properties = {
        "spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration,org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration",
        "spring.rabbitmq.listener.simple.auto-startup=false"
    }
)
@TestPropertySource(properties = {
    "spring.rabbitmq.host=localhost",
    "spring.rabbitmq.port=5672",
    "spring.rabbitmq.username=guest",
    "spring.rabbitmq.password=guest"
})
@Import(TestConfig.class)
class BaltoTestApplicationTests {

    // Mock repository and service beans commonly required by your context
    @MockBean
    private com.baltotest.application.usecase.ProfileUseCase profileUseCase;

    @MockBean
    private com.baltotest.application.usecase.AuthUseCase authUseCase;

    @MockBean
    private com.baltotest.application.port.out.JwtTokenProviderPort jwtTokenProviderPort;

    @MockBean
    private com.baltotest.domain.port.UserRepositoryPort userRepositoryPort;

    @Test
    void contextLoads() {
    }

}

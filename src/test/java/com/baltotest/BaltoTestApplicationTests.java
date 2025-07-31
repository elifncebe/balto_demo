package com.baltotest;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;

@SuppressWarnings("removal")
@SpringBootTest(
    classes = BaltoTestApplication.class,
    properties = {
        "spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration,org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration"
    }
)
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

    // Add more @MockBean declarations here for any other missing beans reported in your stack trace

    @Test
    void contextLoads() {
    }

}

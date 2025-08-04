#!/bin/bash

echo "Fixing Balto Test Application issues..."

# 1. Create the SimpleApp class in a temporary file
cat > SimpleApp.java << 'EOF'
package com.baltotest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication(
    exclude = {
        DataSourceAutoConfiguration.class,
        HibernateJpaAutoConfiguration.class,
        SecurityAutoConfiguration.class
    }
)
@RestController
public class SimpleApp {

    public static void main(String[] args) {
        SpringApplication.run(SimpleApp.class, args);
    }

    @GetMapping("/")
    public String home() {
        return "<html><body><h1>Balto Test Application</h1>" +
               "<p>Application running successfully!</p>" +
               "</body></html>";
    }

    @GetMapping("/api/status")
    public String status() {
        return "{\"status\": \"UP\", \"message\": \"Application running successfully\"}";
    }

    @GetMapping("/hello")
    public String hello() {
        return "<html><body><h1>Hello from Balto Test!</h1></body></html>";
    }

    @GetMapping("/shutdown")
    public String shutdown() {
        new Thread(() -> {
            try {
                Thread.sleep(1000);
                System.exit(0);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }).start();

        return "<html><body><h1>Shutting down...</h1></body></html>";
    }
}
EOF

# 2. Create a simple properties file
cat > application.properties << 'EOF'
# Simple configuration
server.port=8080
logging.level.root=INFO
spring.main.banner-mode=off
EOF

# 3. Create a simple run script
cat > run.sh << 'EOF'
#!/bin/bash
java -cp .:SimpleApp.class com.baltotest.SimpleApp
EOF
chmod +x run.sh

# 4. Compile the application
javac -d . SimpleApp.java

echo "\nApplication fixed and ready to run.\n"
echo "To run the application, execute:\n"
echo "    ./run.sh\n"
echo "Or manually:\n"
echo "    java -cp . com.baltotest.SimpleApp\n"

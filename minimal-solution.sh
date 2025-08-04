#!/bin/bash

echo "Running Balto Test minimal solution..."

# Create src directory structure
mkdir -p src/main/java/com/baltotest
mkdir -p src/main/resources

# Create minimal application class
cat > src/main/java/com/baltotest/MinimalApp.java << 'EOF'
package com.baltotest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
@RestController
public class MinimalApp {

    public static void main(String[] args) {
        SpringApplication.run(MinimalApp.class, args);
    }

    @GetMapping("/")
    public String home() {
        return "<h1>Balto Test Application</h1><p>Successfully running!</p>";
    }

    @GetMapping("/quit")
    public String quit() {
        new Thread(() -> {
            try { Thread.sleep(500); } catch (InterruptedException e) {}
            System.exit(0);
        }).start();
        return "<h1>Shutting down...</h1>";
    }
}
EOF

# Create minimal properties file
cat > src/main/resources/application.properties << 'EOF'
# Minimal configuration
server.port=8080
spring.main.banner-mode=off
logging.level.root=INFO
# Disable security auto-configuration
spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration
EOF

# Create minimal build file
cat > build.gradle << 'EOF'
plugins {
    id "java"
    id "org.springframework.boot" version "3.1.0"
    id "io.spring.dependency-management" version "1.1.0"
}

group = "com.baltotest"
version = "0.0.1-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    implementation "org.springframework.boot:spring-boot-starter-web"
}

tasks.named("bootRun") {
    mainClass = "com.baltotest.MinimalApp"
}
EOF

# Create a direct run script
cat > run-direct.sh << 'EOF'
#!/bin/bash

echo "Compiling and running minimal application..."

# Make sure we have the right directories
mkdir -p classes

# Compile the main class
javac -d classes -cp "$(find ~/.gradle -name "*.jar" | tr '\n' ':')" src/main/java/com/baltotest/MinimalApp.java

# Copy the resources
cp -R src/main/resources/* classes/

# Run the application
java -cp classes:"$(find ~/.gradle -name "*.jar" | tr '\n' ':')" com.baltotest.MinimalApp
EOF
chmod +x run-direct.sh

echo "\nMinimal solution created!\n"
echo "To run with Gradle: ./gradlew bootRun"
echo "To run directly: ./run-direct.sh"
echo "\nOnce running, access the application at: http://localhost:8080"
echo "To shutdown, visit: http://localhost:8080/quit"

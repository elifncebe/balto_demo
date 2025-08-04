import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class SIMPLE_RUNNER {
    public static void main(String[] args) {
        try {
            System.out.println("\n=== BALTO TEST MINIMAL RUNNER ===\n");

            // Create SimpleApp.java
            String simpleAppCode = "package com.baltotest;\n\n" +
                "import org.springframework.boot.SpringApplication;\n" +
                "import org.springframework.boot.autoconfigure.SpringBootApplication;\n" +
                "import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;\n" +
                "import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;\n" +
                "import org.springframework.web.bind.annotation.GetMapping;\n" +
                "import org.springframework.web.bind.annotation.RestController;\n\n" +
                "@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class, SecurityAutoConfiguration.class})\n" +
                "@RestController\n" +
                "public class SimpleApp {\n\n" +
                "    public static void main(String[] args) {\n" +
                "        SpringApplication.run(SimpleApp.class, args);\n" +
                "        System.out.println(\"Balto Test App running!\");\n" +
                "    }\n\n" +
                "    @GetMapping(\"/\")\n" +
                "    public String home() {\n" +
                "        return \"<h1>Balto Test App</h1>\";\n" +
                "    }\n" +
                "}\n";

            // Ensure directory exists
            Path dir = Paths.get("src/main/java/com/baltotest");
            Files.createDirectories(dir);

            // Write SimpleApp.java
            Files.writeString(dir.resolve("SimpleApp.java"), simpleAppCode);
            System.out.println("Created SimpleApp.java");

            // Run using gradlew
            ProcessBuilder pb = new ProcessBuilder("./gradlew", "bootRun", "-PmainClass=com.baltotest.SimpleApp", "--args='--spring.profiles.active=simple'");
            pb.inheritIO();
            pb.start();

            // Wait 10 seconds for application to start
            System.out.println("Waiting for application to start...");
            Thread.sleep(10000);

            // Try to access the application
            try {
                HttpClient client = HttpClient.newHttpClient();
                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create("http://localhost:8080/"))
                        .build();

                HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
                System.out.println("\nApplication response: " + response.statusCode());
                System.out.println(response.body());
            } catch (Exception e) {
                System.out.println("Could not connect to application: " + e.getMessage());
            }

            System.out.println("\nApplication should be running. Press Ctrl+C to exit.");
        } catch (IOException | InterruptedException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
}

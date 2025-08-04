// Standalone Java application for Balto Test
// Run with: java standalone.java

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;

public class standalone {
    public static void main(String[] args) throws Exception {
        // Create HTTP server on port 8080
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);

        // Add context handlers
        server.createContext("/", new HomeHandler());
        server.createContext("/hello", new HelloHandler());
        server.createContext("/quit", new QuitHandler(server));

        // Start the server
        server.start();

        System.out.println("\n=====================================");
        System.out.println("Balto Test Standalone Server");
        System.out.println("=====================================");
        System.out.println("Server started on port 8080");
        System.out.println("Visit: http://localhost:8080");
        System.out.println("Shutdown: http://localhost:8080/quit");
        System.out.println("=====================================");
    }

    // Home page handler
    static class HomeHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String response = "<html><body>" +
                    "<h1>Balto Test Standalone Server</h1>" +
                    "<p>The server is running successfully!</p>" +
                    "<ul>" +
                    "<li><a href='/hello'>Hello</a></li>" +
                    "<li><a href='/quit'>Shutdown Server</a></li>" +
                    "</ul>" +
                    "</body></html>";
            sendResponse(exchange, response);
        }
    }

    // Hello page handler
    static class HelloHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String response = "<html><body>" +
                    "<h1>Hello from Balto Test!</h1>" +
                    "<p>This is a simple standalone Java HTTP server.</p>" +
                    "<p><a href='/'>Back to Home</a></p>" +
                    "</body></html>";
            sendResponse(exchange, response);
        }
    }

    // Quit handler to shutdown the server
    static class QuitHandler implements HttpHandler {
        private final HttpServer server;

        public QuitHandler(HttpServer server) {
            this.server = server;
        }

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String response = "<html><body>" +
                    "<h1>Shutting Down Server...</h1>" +
                    "<p>The server will shut down in 2 seconds.</p>" +
                    "</body></html>";
            sendResponse(exchange, response);

            // Shutdown after a short delay
            new Thread(() -> {
                try {
                    Thread.sleep(2000);
                    server.stop(0);
                    System.out.println("Server has been shut down.");
                    System.exit(0);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }).start();
        }
    }

    // Helper method to send HTML response
    private static void sendResponse(HttpExchange exchange, String response) throws IOException {
        exchange.getResponseHeaders().set("Content-Type", "text/html");
        exchange.sendResponseHeaders(200, response.length());
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(response.getBytes());
        }
    }
}

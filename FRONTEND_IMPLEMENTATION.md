# Balto Frontend Implementation

This document provides a comprehensive overview of the frontend implementation for the Balto Logistics Management System.

## Overview

The Balto frontend is a server-rendered web application built using:

- **Spring MVC**: For handling HTTP requests and responses
- **Thymeleaf**: For server-side HTML templating
- **Tailwind CSS**: For styling and responsive design
- **JWT Authentication**: For securing protected routes

The frontend follows a traditional server-rendered approach without client-side frameworks, as specified in the requirements. All pages are rendered on the server and sent to the client as complete HTML documents.

## Template Structure

The frontend consists of the following templates:

### 1. Login Page (`login.html`)

- Email and password input form
- Error display for authentication failures
- Form submission to `/api/auth/login`
- JWT-based authentication (handled by backend)

### 2. Dashboard (`dashboard.html`)

- List of loads with filtering options
- Each load shows ID, customer name, pickup date, VIN count, and status
- Actions for each load: View, Message, Resolve
- Table layout with responsive design

### 3. Load Detail & Messaging (`load-detail.html`)

- Load information (customer, pickup/dropoff, broker, timestamps)
- List of attached VINs
- Messaging thread showing all messages for the load
- Compose box with text input, channel dropdown, and file upload
- Form submission to POST message (sent via RabbitMQ backend)
- Mark as resolved button

### 4. Create New Load (`create-load.html`)

- Form with customer information (name, email, phone)
- Pickup and dropoff address fields with ETA
- Multiple VIN entry rows (static)
- Notes section
- Form submission to `/web/loads/create`

### 5. Analytics Summary (`analytics.html`)

- Broker-level metrics:
  - Total VINs per month (for billing)
  - Return visits per user (retention)
  - Inbound messages volume
  - Average message delivery delay
- Charts and graphs for data visualization
- Date range filtering

### 6. Error Page (`error.html`)

- Displays error messages
- Provides navigation options based on authentication status
- Consistent styling with other pages

## Controller Architecture

The frontend is served by two main controllers:

### 1. HomeController

Handles unauthenticated access and basic endpoints:

- `/` and `/login`: Serves the login page
- `/api/health`: Returns application health status

```java
@Controller
public class HomeController {
    @GetMapping("/")
    public String home() {
        return "login";
    }
    
    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/api/health")
    @ResponseBody
    public String health() {
        return "{\"status\": \"UP\", \"message\": \"Application is running\"}";
    }
}
```

### 2. WebController

Handles authenticated pages and form submissions:

- `/dashboard`: Serves the dashboard page with loads list
- `/loads/{id}`: Serves the load detail page
- `/loads/new`: Serves the create load form
- `/analytics`: Serves the analytics page
- `/web/loads/create`: Handles load creation form submission
- `/loads/{id}/message`: Handles message submission
- `/loads/{id}/resolve`: Handles marking a load as resolved
- `/error`: Serves the error page

```java
@Controller
public class WebController {
    // Dashboard page
    @GetMapping("/dashboard")
    public String dashboard(Model model, 
                           @RequestParam(required = false) String status,
                           @RequestParam(required = false) LocalDate pickupDate) {
        // Implementation details...
    }
    
    // Other endpoints...
}
```

## Authentication Flow

1. User accesses the application at `/`
2. HomeController serves the login page
3. User submits credentials to `/api/auth/login`
4. Backend validates credentials and returns a JWT
5. JWT is stored in the session
6. User is redirected to the dashboard
7. WebController serves authenticated pages, checking JWT for each request

## Styling with Tailwind CSS

All pages use Tailwind CSS for styling, loaded via CDN:

```html
<!-- Tailwind CSS CDN -->
<script src="https://cdn.tailwindcss.com"></script>
```

Custom configuration is applied to match the Balto color scheme:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#3498db',
                'primary-dark': '#2980b9',
                secondary: '#2c3e50',
                success: '#2ecc71',
                warning: '#f39c12',
                danger: '#e74c3c',
                light: '#ecf0f1',
                dark: '#34495e',
                gray: '#95a5a6',
            }
        }
    }
}
```

Custom utility classes are defined for common components:

```css
@layer utilities {
    .btn-primary {
        @apply bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded;
    }
    /* Other utility classes... */
}
```

## Form Handling

Forms are submitted using standard HTML form submission:

```html
<form th:action="@{/web/loads/create}" method="post" th:object="${loadRequest}">
    <!-- Form fields... -->
    <button type="submit" class="btn-primary">Create Load</button>
</form>
```

Form data is bound to model objects using Thymeleaf:

```html
<input 
    type="text" 
    id="customerName" 
    name="customerName" 
    th:field="*{customerName}"
    class="form-input" 
    required
>
```

## Error Handling

Errors are handled at multiple levels:

1. **Controller Level**: Try-catch blocks capture exceptions and add error messages to the model
2. **Template Level**: Conditional rendering shows error messages when present
3. **Global Level**: Spring's error handling serves the error template for unhandled exceptions

## Usage Instructions

### Running the Application

1. Start the Spring Boot application
2. Access the application at `http://localhost:8080/`
3. Log in with your credentials
4. Navigate through the application using the navigation menu

### Development

To modify the frontend:

1. Edit the HTML templates in `src/main/resources/templates/`
2. Edit the controllers in `src/main/java/com/baltotest/adapter/controller/`
3. Restart the application to see changes

### Adding New Pages

To add a new page:

1. Create a new HTML template in `src/main/resources/templates/`
2. Add a new endpoint in the appropriate controller
3. Update the navigation menu in existing templates

## Future Improvements

Potential improvements for future versions:

1. **Client-side Validation**: Add JavaScript validation for forms
2. **Real-time Updates**: Implement WebSocket for real-time messaging
3. **Pagination**: Add pagination for large data sets
4. **Advanced Filtering**: Enhance filtering options
5. **Mobile Optimization**: Further improve mobile experience
6. **Accessibility**: Enhance accessibility features

## Conclusion

The Balto frontend provides a clean, responsive user interface for the Logistics Management System. It follows a traditional server-rendered approach with modern styling using Tailwind CSS. The implementation is modular and maintainable, with clear separation of concerns between controllers and templates.
# Ambiguous Mapping Fix

## Issue Description

The application was failing to start with the following error:

```
Error creating bean with name 'securityFilterChain' defined in class path resource [com/baltotest/config/WebSecurityConfig.class]: Failed to instantiate [org.springframework.security.web.SecurityFilterChain]: Factory method 'securityFilterChain' threw exception with message: Error creating bean with name 'mvcHandlerMappingIntrospector' defined in class path resource [org/springframework/boot/autoconfigure/web/servlet/WebMvcAutoConfiguration$EnableWebMvcConfiguration.class]: Error creating bean with name 'requestMappingHandlerMapping' defined in class path resource [org/springframework/boot/autoconfigure/web/servlet/WebMvcAutoConfiguration$EnableWebMvcConfiguration.class]: Ambiguous mapping. Cannot map 'webController' method 
com.baltotest.adapter.controller.WebController#createLoad(LoadRequest, Model)
to {POST [/api/loads]}: There is already 'loadController' bean method
com.baltotest.adapter.controller.LoadController#createLoad(LoadRequest) mapped.
```

This error occurred because there were two controller methods mapped to the same URL path (`/api/loads`) with the same HTTP method (POST):

1. `WebController.createLoad(LoadRequest, Model)` - For handling form submissions
2. `LoadController.createLoad(LoadRequest)` - For handling RESTful API requests

## Solution

The solution was to change the URL mapping in the WebController to avoid the conflict with the LoadController. The following changes were made:

1. Changed the `@PostMapping` in `WebController` from `/api/loads` to `/web/loads/create`
2. Updated the form action in `create-load.html` from `/api/loads` to `/web/loads/create`
3. Updated all references in documentation from `/api/loads` to `/web/loads/create`

### Code Changes

#### 1. WebController.java

```java
// Before
@PostMapping("/api/loads")
public String createLoad(@ModelAttribute LoadRequest loadRequest, Model model) {
    // Implementation...
}

// After
@PostMapping("/web/loads/create")
public String createLoad(@ModelAttribute LoadRequest loadRequest, Model model) {
    // Implementation...
}
```

#### 2. create-load.html

```html
<!-- Before -->
<form th:action="@{/api/loads}" method="post" th:object="${loadRequest}">
    <!-- Form fields... -->
</form>

<!-- After -->
<form th:action="@{/web/loads/create}" method="post" th:object="${loadRequest}">
    <!-- Form fields... -->
</form>
```

## Reasoning

This approach was chosen for the following reasons:

1. **Separation of Concerns**: The WebController is for server-side rendering (returning views), while the LoadController is for RESTful API endpoints (returning JSON). It makes sense to have different URL patterns for these different concerns.

2. **Minimal Impact**: Changing the WebController's URL mapping has minimal impact on the system, as it's only used by the frontend template. The LoadController's API endpoint might be used by other services or clients, so changing it could break existing integrations.

3. **Clear URL Structure**: The new URL (`/web/loads/create`) clearly indicates that it's a web endpoint for creating loads, which is more descriptive than the generic `/api/loads`.

## Testing

After making these changes, the application should start successfully without the ambiguous mapping error. The form submission from the frontend will now be handled by the WebController's createLoad method at the new URL path.

## Future Considerations

For future development, consider:

1. **Consistent URL Patterns**: Establish a convention for URL patterns, such as:
   - `/api/*` for RESTful API endpoints
   - `/web/*` for web pages and form submissions

2. **Documentation**: Keep documentation up-to-date with any URL changes to avoid confusion.

3. **API Versioning**: Consider implementing API versioning (e.g., `/api/v1/loads`) to allow for future changes without breaking existing clients.
# Balto Frontend Guide

This guide provides information on how to access and use the Balto frontend application.

## Accessing the Frontend

The Balto frontend can be accessed through a web browser by navigating to the application's root URL:

```
http://localhost:8080/
```

When the application is running, this URL will load the React-based frontend interface.

## Features

The frontend provides a user interface for interacting with the Balto Logistics Management System. Key features include:

### Authentication

- **Login**: Users can log in with their email and password
- **Registration**: New users can create an account

### Dashboard

Once logged in, users have access to the following sections:

#### Loads Management

- View all loads with their status and details
- Create new loads
- Update existing loads
- View load details

#### Messaging

- View and send messages
- Chat with other users about specific loads
- Track message history

#### Channels

- Join communication channels
- Create new channels for specific topics or teams
- Collaborate with team members

## Technical Details

The frontend is built using:

- **React**: For building the user interface components
- **Bootstrap 5**: For responsive styling and layout
- **Axios**: For making API calls to the backend
- **Babel**: For transpiling JSX code

## Known Limitations

This is a v0 demo implementation with the following limitations:

1. **Mock Data**: Some sections display placeholder data for demonstration purposes
2. **Authentication**: The authentication system is functional but doesn't include features like password reset
3. **Offline Support**: The application requires an active connection to the backend
4. **Browser Support**: Best experienced in modern browsers (Chrome, Firefox, Safari, Edge)

## Future Improvements

Planned improvements for future versions:

1. **Real-time Updates**: Implement WebSocket for real-time messaging and notifications
2. **Mobile App**: Develop a dedicated mobile application
3. **Advanced Filtering**: Add more sophisticated search and filtering options
4. **Data Visualization**: Add charts and graphs for analytics
5. **Offline Mode**: Implement offline capabilities with data synchronization

## Troubleshooting

If you encounter issues with the frontend:

1. **Static Resources Not Loading**: Ensure the application is running and that the static resources are properly configured
2. **API Errors**: Check the browser console for error messages related to API calls
3. **Rendering Issues**: Clear browser cache and reload the page

## Running the Application

To run the application:

1. Start the Spring Boot application using one of the provided scripts (e.g., `RUN_MAIN_APP.sh`)
2. Open a web browser and navigate to `http://localhost:8080/`
3. The frontend should load automatically

To terminate the application, you can:
- Use the "Terminate Application" link in the footer
- Navigate to `http://localhost:8080/terminate`
- Use Ctrl+C in the terminal where the application is running
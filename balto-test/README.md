# Balto Logistics Platform

A modern logistics management platform with customer login and driver readiness tracking.

## Features

- **Minimal Landing Page**: Clean design featuring just the Balto logo and "shipping that matters" tagline
- **Customer Login**: Secure authentication system for customers
- **Internal Dashboard**: Comprehensive dashboard for logistics management
- **Driver Readiness Tracking**: Real-time monitoring of driver availability and status

## Implementation Details

This application is built with React and follows a component-based architecture:

1. **Landing Page**: Displays the Balto logo and tagline for 3 seconds before transitioning to the login page
2. **Login Component**: Provides authentication for customers with email and password validation
3. **Dashboard Component**: Internal interface with navigation and driver readiness information
4. **Driver Readiness Section**: Displays driver statistics and status information

## How to Run the Application

1. Navigate to the project directory:
   ```bash
   cd balto-test
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and go to:
   ```
   http://localhost:3000
   ```

## Testing the Application

### Landing Page
- When you first load the application, you should see only the Balto logo with the "shipping that matters" tagline
- After 3 seconds, the login page should automatically appear

### Login Page
- Try submitting the form without entering email or password to see validation errors
- Enter any email and password to log in (no actual authentication in this demo)

### Dashboard
- After logging in, you should see the dashboard with navigation links at the top
- The driver readiness section should display statistics and a table of driver statuses
- Click the logout button to return to the login page

## Color Scheme

The application uses the Balto color scheme:
- Main background: #1E1D39 (dark purple)
- Text color: #F4F2F2 (white)
- Accent color: #6475D4 (purple/blue)
- Secondary colors: #696B6F (gray)

## Typography

- "Balto" text uses Space Grotesk Bold
- "shipping that matters" tagline uses DM Sans Regular
- These fonts are loaded from Google Fonts in the index.html file

## Future Enhancements

- Add actual authentication with backend integration
- Implement more dashboard features (load management, messaging, etc.)
- Add responsive design for mobile devices
- Implement data visualization for driver metrics
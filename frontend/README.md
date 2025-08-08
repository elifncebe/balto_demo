# Logistics Platform Frontend

This repository contains the frontend applications for the logistics platform, designed for two user types: customers and brokers, integrating with Junie's existing codebase and conventions.

## Architecture Overview

The frontend is organized into four main packages:

1. **customer-app**: React Native mobile app for customers
2. **broker-web**: React JS web app for brokers
3. **broker-app**: React Native mobile app for brokers
4. **shared-components**: Shared UI components and utilities

### Technology Stack

- **React Native** (v0.72.6) for mobile apps
- **React JS** (v18.2.0) for web app
- **Expo** (v49.0.15) for React Native development
- **React Navigation** for mobile app navigation
- **React Router** for web app routing
- **Axios** for API communication
- **Styled Components** for styling

## Project Structure

```
/frontend
├── customer-app/              # React Native app for customers
│   ├── src/
│   │   ├── screens/           # Screen components
│   │   │   ├── auth/          # Authentication screens
│   │   │   ├── dashboard/     # Dashboard screens
│   │   │   ├── loads/         # Load management screens
│   │   │   └── profile/       # Profile screens
│   │   └── ...
│   ├── App.js                 # Main app component
│   └── package.json           # Dependencies and scripts
│
├── broker-web/                # React JS web app for brokers
│   ├── src/
│   │   ├── components/        # UI components
│   │   ├── pages/             # Page components
│   │   ├── routes/            # Routing configuration
│   │   └── ...
│   └── package.json           # Dependencies and scripts
│
├── broker-app/                # React Native app for brokers
│   ├── src/
│   │   ├── screens/           # Screen components
│   │   └── ...
│   ├── App.js                 # Main app component
│   └── package.json           # Dependencies and scripts
│
└── shared-components/         # Shared UI components and utilities
    ├── src/
    │   ├── components/        # Shared UI components
    │   │   ├── Button.js
    │   │   ├── Card.js
    │   │   ├── Input.js
    │   │   ├── LoadingIndicator.js
    │   │   └── Typography.js
    │   ├── styles/            # Shared styles
    │   │   └── theme.js       # Theme configuration
    │   └── utils/             # Shared utilities
    │       ├── api.js         # API communication
    │       └── auth.js        # Authentication utilities
    └── package.json           # Dependencies and scripts
```

## Authentication Flow

The platform uses JWT-based authentication with role-based access control, following Junie's API integration patterns:

1. **Login Flow**:
   - User enters credentials (email/password)
   - Backend validates credentials and returns JWT token with role claim
   - Token is stored securely (localStorage for web, SecureStore for mobile)
   - App checks token and role to determine appropriate screens

2. **Registration Flow**:
   - User enters registration details including role (CUSTOMER or BROKER)
   - Backend creates user account and returns JWT token
   - Token is stored securely
   - User is redirected to appropriate screens based on role

3. **Role-Based Access**:
   - Each app checks user role on startup
   - Customer app only allows CUSTOMER role
   - Broker apps only allow BROKER role
   - Unauthorized users are redirected to login

## Shared Components

The shared-components library provides consistent UI elements and utilities across all applications, adhering to Junie's shared UI/component conventions:

### UI Components

- **Button**: Customizable button with different variants (primary, secondary, outline, text)
- **Input**: Form input with validation and error display
- **Card**: Container component with different variants (default, outlined, elevated)
- **Typography**: Text components with consistent styling (H1-H6, Body1, Body2, Caption)
- **LoadingIndicator**: Loading spinner with fullscreen option

### Utilities

- **api.js**: Axios-based API client with:
  - Automatic token inclusion in requests
  - Error handling
  - Response interceptors
  - Convenience methods for HTTP operations

- **auth.js**: Authentication utilities with:
  - Token management (get, set, remove)
  - User data management
  - Role checking
  - Login/logout functionality

### Theme

The `theme.js` file defines shared styling for consistent branding:

- Colors (primary, secondary, accent, semantic, neutral)
- Typography (font families, sizes, line heights)
- Spacing
- Border radius
- Shadows/elevation

## Setup Instructions

### Prerequisites

- Node.js (v16+)
- npm or yarn
- For mobile development:
  - Expo CLI
  - iOS Simulator (Mac only) or Android Emulator
  - Physical device for testing (optional)

### Installation

1. **Install dependencies for all packages**:

```bash
# Install root dependencies
cd frontend
npm install

# Install shared-components dependencies
cd shared-components
npm install

# Install customer-app dependencies
cd ../customer-app
npm install

# Install broker-web dependencies
cd ../broker-web
npm install

# Install broker-app dependencies
cd ../broker-app
npm install
```

2. **Build shared components**:

```bash
cd ../shared-components
npm run build
```

### Running the Applications

#### Customer Mobile App

```bash
cd ../customer-app
npm start
```

Then follow Expo instructions to run on iOS, Android, or web.

#### Broker Web App

```bash
cd ../broker-web
npm start
```

The web app will be available at http://localhost:3000.

#### Broker Mobile App

```bash
cd ../broker-app
npm start
```

Then follow Expo instructions to run on iOS, Android, or web.

## Deployment

### Mobile Apps (customer-app, broker-app)

1. **Build for production**:

```bash
cd customer-app  # or broker-app
expo build:android  # For Android
expo build:ios      # For iOS
```

2. **Submit to app stores**:
   - Follow [Expo's publishing guide](https://docs.expo.dev/distribution/app-stores/) for detailed instructions
   - Configure app.json with appropriate app store information

### Web App (broker-web)

1. **Build for production**:

```bash
cd broker-web
npm run build
```

2. **Deploy to hosting service**:
   - The build output in the `build` directory can be deployed to:
     - Vercel
     - Netlify
     - AWS S3 + CloudFront
     - Any static hosting service

3. **Environment configuration**:
   - Create `.env` files for different environments:
     - `.env.development` for development
     - `.env.production` for production
   - Configure API endpoints and other environment-specific variables

## Environment Configuration

Each application can be configured using environment variables:

### Web App

Create `.env` files with the following variables:

```
REACT_APP_API_URL=https://api.example.com
REACT_APP_AUTH_ENDPOINT=/api/auth
```

### Mobile Apps

Configure in `app.json`:

```json
{
  "expo": {
    "extra": {
      "apiUrl": "https://api.example.com",
      "authEndpoint": "/api/auth"
    }
  }
}
```

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Test your changes on all affected applications
4. Submit a pull request

## License

This project is proprietary and confidential.
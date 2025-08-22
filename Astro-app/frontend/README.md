# Astro App Frontend

A modern React application built with Vite, TypeScript, and Shadcn UI for connecting users with astrologers and accessing astrological services.

## Features

- **User Authentication**: Register, login, and profile management
- **Astrologer Directory**: Browse and search for astrologers
- **Horoscope Services**: Daily, weekly, and monthly horoscopes
- **Kundali Generation**: Birth chart generation and analysis
- **Astro Mall**: E-commerce for spiritual and astrological products
- **Booking System**: Schedule consultations with astrologers
- **Responsive Design**: Works on desktop, tablet, and mobile

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Components**: Shadcn UI (Radix UI + Tailwind CSS)
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Authentication**: JWT with Context API
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend server running (see backend README)

### Installation

1. Clone the repository and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure the API URL in `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── ui/             # Shadcn UI components
├── contexts/           # React contexts (Auth, etc.)
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── services/           # API services
├── lib/                # Utility functions
└── main.tsx           # Application entry point
```

## API Integration

The frontend integrates with the backend through the following services:

### Authentication (`/services/api.js`)
- User registration and login
- Profile management
- JWT token handling

### Astrologers (`/services/api.js`)
- Fetch astrologer listings
- Search and filter astrologers
- View astrologer profiles and reviews

### Products (`/services/api.js`)
- Product catalog
- Search and filter products
- Shopping cart functionality

### Horoscope (`/services/api.js`)
- Daily, weekly, monthly horoscopes
- Zodiac sign information
- Birth date horoscope calculation

### Kundali (`/services/api.js`)
- Birth chart generation
- Astrological analysis
- Compatibility testing

## Key Components

### Authentication Context
- Manages user authentication state
- Handles login/logout functionality
- Provides user information throughout the app

### API Service Layer
- Centralized API communication
- Error handling and response formatting
- Request/response interceptors

### React Query Integration
- Efficient data fetching and caching
- Background updates and synchronization
- Optimistic updates for better UX

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000/api` |
| `VITE_APP_NAME` | Application name | `Astro App` |
| `VITE_APP_VERSION` | Application version | `1.0.0` |

## Backend Integration

This frontend is designed to work with the Astro App backend. Make sure the backend server is running and properly configured before starting the frontend.

For backend setup instructions, see the `backend/README.md` file.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

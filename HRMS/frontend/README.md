# HRMS Frontend

A modern, responsive React.js frontend for the Human Resource Management System (HRMS) built with Redux Toolkit, styled-components, and Vite.

## 🚀 Features

- **Modern React 18** with hooks and functional components
- **Redux Toolkit** for state management
- **Styled Components** for CSS-in-JS styling
- **React Router v6** for navigation
- **Vite** for fast development and building
- **Responsive Design** with mobile-first approach
- **Role-Based Access Control** (RBAC)
- **JWT Authentication** with secure token management
- **Modern UI/UX** with beautiful design system
- **TypeScript Ready** (can be easily converted)

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Styling**: Styled Components
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form
- **Icons**: React Icons
- **Notifications**: React Hot Toast
- **Charts**: Recharts (ready for implementation)
- **Date Handling**: Date-fns
- **UI Components**: Custom components with styled-components

## 📁 Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Layout/        # Layout components (Sidebar, Header)
│   │   └── UI/            # Common UI components
│   ├── pages/             # Page components
│   │   ├── Auth/          # Authentication pages
│   │   ├── Dashboard/     # Dashboard page
│   │   ├── Employees/     # Employee management
│   │   ├── Attendance/    # Attendance tracking
│   │   ├── Leave/         # Leave management
│   │   ├── Payroll/       # Payroll management
│   │   ├── Company/       # Company settings
│   │   └── Settings/      # User settings
│   ├── store/             # Redux store configuration
│   │   └── slices/        # Redux slices for different features
│   ├── services/          # API services
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   ├── styles/            # Global styles and themes
│   ├── assets/            # Images, fonts, etc.
│   ├── App.jsx            # Main App component
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global CSS variables
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
└── README.md              # This file
```

## 🎨 Design System

The application uses a comprehensive design system with CSS custom properties:

- **Color Palette**: Primary, neutral, and semantic colors
- **Typography**: Inter font family with consistent sizing
- **Spacing**: Consistent spacing scale (4px base unit)
- **Shadows**: Multiple shadow levels for depth
- **Border Radius**: Consistent border radius values
- **Transitions**: Smooth animations and transitions

## 🔐 Authentication & Authorization

- **JWT Token Management**: Secure token storage and handling
- **Role-Based Access Control**: Different access levels for different user roles
- **Protected Routes**: Automatic redirection for unauthorized access
- **Persistent Sessions**: Token persistence across browser sessions

## 📱 Responsive Design

- **Mobile-First Approach**: Designed for mobile devices first
- **Responsive Breakpoints**: Consistent breakpoints for different screen sizes
- **Touch-Friendly**: Optimized for touch devices
- **Progressive Enhancement**: Enhanced experience on larger screens

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn
- Backend server running (see backend README)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hrms/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env.local` (if needed)
   - Configure backend API URL in `vite.config.js`

4. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open Browser**
   - Navigate to `http://localhost:3000`
   - The app will proxy API calls to your backend at `http://localhost:5000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Vite Configuration

The `vite.config.js` includes:

- **Path Aliases**: Short imports for common directories
- **Proxy Configuration**: API calls proxied to backend
- **Build Optimization**: Source maps and output configuration

### Redux Store

The Redux store is configured with:

- **Redux Toolkit**: Modern Redux with built-in best practices
- **DevTools**: Redux DevTools for development
- **Middleware**: Custom middleware for async operations

## 📊 State Management

### Redux Slices

- **Auth Slice**: User authentication and profile management
- **Company Slice**: Company and organizational data
- **Employee Slice**: Employee information management
- **Attendance Slice**: Attendance tracking
- **Leave Slice**: Leave management
- **Payroll Slice**: Payroll processing
- **UI Slice**: UI state and notifications

### API Integration

- **Axios Instance**: Configured with interceptors
- **Authentication**: Automatic token inclusion in requests
- **Error Handling**: Centralized error handling and user feedback
- **Response Caching**: Ready for React Query integration

## 🎯 Key Components

### Layout Components

- **Sidebar**: Navigation with role-based menu items
- **Header**: Top navigation with user actions
- **Layout**: Main layout wrapper with responsive behavior

### Authentication Components

- **Login**: User authentication form
- **Protected Routes**: Route protection based on authentication
- **Role Guards**: Component-level access control

### Dashboard Components

- **Stats Cards**: Key metrics display
- **Activity Feed**: Recent system activities
- **Quick Actions**: Common user actions

## 🔒 Security Features

- **JWT Token Validation**: Secure token handling
- **Route Protection**: Automatic redirection for unauthorized access
- **Role-Based Access**: Different features for different user roles
- **Secure Storage**: Token storage in localStorage with proper cleanup

## 📱 Mobile Support

- **Responsive Design**: Works on all device sizes
- **Touch Optimization**: Touch-friendly interface elements
- **Mobile Navigation**: Collapsible sidebar for mobile devices
- **Progressive Web App**: Ready for PWA features

## 🚀 Performance Features

- **Code Splitting**: Route-based code splitting
- **Lazy Loading**: Components loaded on demand
- **Optimized Builds**: Vite for fast development and optimized production builds
- **Bundle Analysis**: Ready for bundle analysis tools

## 🧪 Testing

The project is set up for testing with:

- **Jest**: Testing framework
- **React Testing Library**: Component testing utilities
- **Test Structure**: Organized test files alongside components

## 📦 Build & Deployment

### Production Build

```bash
npm run build
```

### Build Output

- **Dist Folder**: Production-ready files
- **Optimized Assets**: Minified and optimized code
- **Source Maps**: Optional source maps for debugging

### Deployment

The build output can be deployed to:

- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **CDN**: CloudFront, Cloudflare
- **Server**: Nginx, Apache

## 🔄 Development Workflow

1. **Feature Development**: Create new components and pages
2. **State Management**: Add Redux slices for new features
3. **API Integration**: Create services for backend communication
4. **Styling**: Use styled-components with design system
5. **Testing**: Write tests for new functionality
6. **Documentation**: Update documentation as needed

## 🤝 Contributing

1. Follow the existing code structure and patterns
2. Use the established design system
3. Write tests for new features
4. Update documentation
5. Follow the commit message conventions

## 📚 Additional Resources

- [React Documentation](https://reactjs.org/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Styled Components Documentation](https://styled-components.com/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)

## 🐛 Troubleshooting

### Common Issues

1. **Port Conflicts**: Change port in `vite.config.js`
2. **API Connection**: Ensure backend is running and accessible
3. **Build Errors**: Check Node.js version and dependencies
4. **Styling Issues**: Verify CSS custom properties are loaded

### Getting Help

- Check the console for error messages
- Verify all dependencies are installed
- Ensure backend server is running
- Check network tab for API call issues

## 📄 License

This project is licensed under the MIT License.

## 🚀 Next Steps

- [ ] Implement remaining page functionality
- [ ] Add comprehensive testing
- [ ] Implement dark mode theme
- [ ] Add more interactive components
- [ ] Implement real-time notifications
- [ ] Add offline support
- [ ] Implement progressive web app features

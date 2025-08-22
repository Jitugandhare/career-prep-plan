# Astro App - Complete Astrology Platform

A full-stack astrology application with real-time chat, payment integration, and comprehensive astrological services.

## 🌟 Features

### Core Features
- **User Authentication & Authorization** - Secure login/register with JWT
- **Astrologer Profiles** - Browse and connect with verified astrologers
- **Horoscope Services** - Daily, weekly, and monthly horoscopes
- **Kundali Analysis** - Comprehensive birth chart analysis
- **E-commerce Mall** - Spiritual products and gemstones
- **Real-time Chat** - Live messaging with astrologers
- **Payment Integration** - Secure Razorpay payment processing

### Advanced Features
- **Real-time Notifications** - Live updates and status changes
- **Search & Filtering** - Advanced search across all services
- **Responsive Design** - Mobile-first approach
- **Role-based Access** - User, Astrologer, and Admin roles
- **File Upload Support** - Profile images and documents
- **Rating & Reviews** - User feedback system

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Shadcn/ui** for UI components
- **React Router DOM** for routing
- **TanStack React Query** for data fetching
- **Socket.io Client** for real-time features
- **Axios** for API communication

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **Socket.io** for real-time communication
- **JWT** for authentication
- **Razorpay** for payment processing
- **Express Validator** for input validation
- **Multer** for file uploads
- **Helmet** for security headers

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Razorpay account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Astro-app
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp env.example .env
   # Edit .env with your configuration
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   # Create .env file with API URL
   npm run dev
   ```

### Environment Variables

#### Backend (.env)
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/astro-app

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

## 📱 Pages & Features

### Public Pages
- **Home** (`/`) - Landing page with services overview
- **Astrologers** (`/astrologers`) - Browse and search astrologers
- **Horoscope** (`/horoscope`) - Daily, weekly, monthly horoscopes
- **Kundali** (`/kundali`) - Birth chart analysis
- **Mall** (`/mall`) - Spiritual products marketplace
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - User registration

### Protected Pages
- **Chat** (`/chat`) - Real-time messaging with astrologers
- **Checkout** (`/checkout`) - Payment processing
- **Payment Success** (`/payment-success`) - Order confirmation

## 💬 Real-time Chat Features

### Chat Functionality
- **Real-time Messaging** - Instant message delivery
- **Typing Indicators** - Shows when someone is typing
- **Online Status** - Real-time online/offline status
- **Message History** - Persistent chat history
- **Unread Count** - Track unread messages
- **File Sharing** - Support for images and files

### Chat Integration
- Chat button on astrologer cards
- Dedicated chat page for all conversations
- Chat icon in navbar for quick access
- Real-time notifications

## 💳 Payment Integration

### Razorpay Features
- **Secure Payments** - PCI DSS compliant
- **Multiple Payment Methods** - Cards, UPI, Net Banking
- **Order Management** - Complete order lifecycle
- **Payment Verification** - Server-side signature verification
- **Refund Support** - Full refund capabilities

### Payment Flow
1. User adds items to cart
2. Proceeds to checkout
3. Fills shipping details
4. Creates payment order
5. Redirects to Razorpay
6. Processes payment
7. Verifies payment signature
8. Shows success page

## 🔐 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcryptjs for password security
- **Input Validation** - Express-validator for all inputs
- **Rate Limiting** - Prevents abuse
- **CORS Protection** - Cross-origin request security
- **Helmet Headers** - Security headers
- **Payment Verification** - Server-side payment validation

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Astrologers
- `GET /api/astrologers` - Get all astrologers
- `GET /api/astrologers/:id` - Get astrologer details
- `POST /api/astrologers` - Create astrologer profile
- `PUT /api/astrologers/:id` - Update profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product

### Payments
- `POST /api/payments/create-order` - Create payment order
- `POST /api/payments/verify` - Verify payment
- `GET /api/payments/:paymentId` - Get payment details
- `POST /api/payments/refund` - Process refund

### Chat
- `GET /api/chat/:roomId` - Get chat history
- `POST /api/chat/:roomId/message` - Send message
- `PUT /api/chat/:roomId/read` - Mark as read
- `GET /api/chat/rooms` - Get user's chat rooms

### Horoscope & Kundali
- `GET /api/horoscope/daily/:sign` - Daily horoscope
- `GET /api/horoscope/weekly/:sign` - Weekly horoscope
- `GET /api/horoscope/monthly/:sign` - Monthly horoscope
- `POST /api/kundali/generate` - Generate kundali
- `POST /api/kundali/analysis` - Analyze kundali

## 🎨 UI Components

### Core Components
- **Navbar** - Navigation with chat icon
- **AstrologerCard** - Astrologer profile cards
- **Chat** - Real-time chat interface
- **ProductCard** - Product display cards
- **PaymentForm** - Checkout form

### UI Features
- **Responsive Design** - Works on all devices
- **Dark/Light Mode** - Theme support
- **Loading States** - Skeleton loaders
- **Error Handling** - User-friendly error messages
- **Toast Notifications** - Success/error feedback

## 🔧 Development

### Scripts
```bash
# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Backend
npm run dev          # Start development server
npm start           # Start production server
```

### Database Schema
- **Users** - User profiles and authentication
- **Astrologers** - Astrologer profiles and services
- **Products** - E-commerce products
- **Bookings** - Consultation bookings
- **Chat Messages** - Real-time chat data

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB database
2. Configure environment variables
3. Deploy to your preferred platform (Heroku, Vercel, etc.)
4. Set up Razorpay webhook endpoints

### Frontend Deployment
1. Update API URL in environment variables
2. Build the application: `npm run build`
3. Deploy to static hosting (Vercel, Netlify, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Email: support@astroapp.com
- Documentation: [Link to docs]
- Issues: [GitHub Issues]

## 🔮 Future Enhancements

- **Video Calling** - Face-to-face consultations
- **AI Horoscope** - AI-powered predictions
- **Mobile App** - React Native application
- **Multi-language** - Internationalization
- **Advanced Analytics** - User behavior tracking
- **Subscription Plans** - Recurring payments
- **Push Notifications** - Real-time alerts




check the errors and fix them. then after add admin functionalities and real-time chat and notificartion functionalities for astrologer and user. in navbar all sections of pages should be available to navigate the page.

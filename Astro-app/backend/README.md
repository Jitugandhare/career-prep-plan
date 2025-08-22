# Astro App Backend

A comprehensive Node.js backend API for the Astro App, providing astrological services, user management, and e-commerce functionality.

## Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (User, Astrologer, Admin)
  - Password encryption with bcrypt

- **Astrologer Management**
  - Astrologer profiles with specialties and ratings
  - Online/offline status tracking
  - Review and rating system

- **Booking System**
  - Consultation booking (call, chat, video call)
  - Payment integration (wallet, cards, UPI)
  - Booking status management
  - Conflict detection

- **E-commerce (Astro Mall)**
  - Product catalog with categories
  - Shopping cart functionality
  - Order management
  - Review system

- **Astrological Services**
  - Daily, weekly, and monthly horoscopes
  - Kundali generation and analysis
  - Compatibility matching
  - Birth chart calculations

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Security**: Helmet, CORS, Rate Limiting
- **File Upload**: Multer

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/astro-app
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system or use MongoDB Atlas.

5. **Run the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password
- `POST /api/auth/logout` - User logout

### Users (Admin Only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Astrologers
- `GET /api/astrologers` - Get all astrologers
- `GET /api/astrologers/:id` - Get astrologer by ID
- `POST /api/astrologers` - Create astrologer profile
- `PUT /api/astrologers/:id` - Update astrologer profile
- `POST /api/astrologers/:id/reviews` - Add review
- `GET /api/astrologers/:id/reviews` - Get reviews
- `PUT /api/astrologers/:id/status` - Update online status

### Products (Astro Mall)
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `POST /api/products/:id/reviews` - Add review
- `GET /api/products/categories` - Get categories
- `GET /api/products/featured` - Get featured products

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user's bookings
- `GET /api/bookings/astrologer` - Get astrologer's bookings
- `GET /api/bookings/:id` - Get booking by ID
- `PUT /api/bookings/:id/status` - Update booking status
- `POST /api/bookings/:id/review` - Add booking review

### Horoscope
- `GET /api/horoscope/daily/:sign` - Get daily horoscope
- `GET /api/horoscope/weekly/:sign` - Get weekly horoscope
- `GET /api/horoscope/monthly/:sign` - Get monthly horoscope
- `GET /api/horoscope/signs` - Get all zodiac signs
- `POST /api/horoscope/birth-date` - Get horoscope by birth date

### Kundali
- `POST /api/kundali/generate` - Generate kundali
- `POST /api/kundali/analysis` - Get kundali analysis
- `POST /api/kundali/compatibility` - Get compatibility analysis

## Database Models

### User
- Basic user information
- Role-based access (user, astrologer, admin)
- Wallet system
- Preferences and settings

### Astrologer
- Extended user profile for astrologers
- Specialties and languages
- Pricing and availability
- Reviews and ratings

### Product
- Product catalog for Astro Mall
- Categories and specifications
- Pricing and inventory
- Reviews and ratings

### Booking
- Consultation bookings
- Payment tracking
- Status management
- Reviews and feedback

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for password security
- **Input Validation**: express-validator for data validation
- **Rate Limiting**: Protection against brute force attacks
- **CORS**: Cross-origin resource sharing configuration
- **Helmet**: Security headers
- **Error Handling**: Comprehensive error handling middleware

## Development

### Project Structure
```
backend/
├── models/          # Database models
├── routes/          # API routes
├── middleware/      # Custom middleware
├── uploads/         # File uploads
├── server.js        # Main server file
├── package.json     # Dependencies
└── README.md        # Documentation
```

### Adding New Features

1. **Create Model**: Define database schema in `models/`
2. **Create Routes**: Add API endpoints in `routes/`
3. **Add Middleware**: Create custom middleware if needed
4. **Update Server**: Register new routes in `server.js`

### Testing

```bash
# Run tests (when implemented)
npm test

# Health check
curl http://localhost:5000/api/health
```

## Deployment

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/astro-app
JWT_SECRET=your-production-secret-key
```

### PM2 (Recommended)
```bash
npm install -g pm2
pm2 start server.js --name "astro-app-backend"
pm2 save
pm2 startup
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions, please contact the development team or create an issue in the repository.

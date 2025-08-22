import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  // Register new user
  register: (userData) => api.post('/auth/register', userData),
  
  // Login user
  login: (credentials) => api.post('/auth/login', credentials),
  
  // Get current user profile
  getProfile: () => api.get('/auth/me'),
  
  // Update user profile
  updateProfile: (profileData) => api.put('/auth/profile', profileData),
  
  // Change password
  changePassword: (passwordData) => api.put('/auth/change-password', passwordData),
  
  // Logout
  logout: () => api.post('/auth/logout'),
};

// Astrologers API
export const astrologersAPI = {
  // Get all astrologers with filters
  getAll: (params = {}) => api.get('/astrologers', { params }),
  
  // Get astrologer by ID
  getById: (id) => api.get(`/astrologers/${id}`),
  
  // Create new astrologer profile
  create: (astrologerData) => api.post('/astrologers', astrologerData),
  
  // Update astrologer profile
  update: (id, astrologerData) => api.put(`/astrologers/${id}`, astrologerData),
  
  // Add review to astrologer
  addReview: (id, reviewData) => api.post(`/astrologers/${id}/reviews`, reviewData),
  
  // Get astrologer reviews
  getReviews: (id) => api.get(`/astrologers/${id}/reviews`),
  
  // Update astrologer status
  updateStatus: (id, status) => api.put(`/astrologers/${id}/status`, { status }),
};

// Products API
export const productsAPI = {
  // Get all products with filters
  getAll: (params = {}) => api.get('/products', { params }),
  
  // Get product by ID
  getById: (id) => api.get(`/products/${id}`),
  
  // Create new product
  create: (productData) => api.post('/products', productData),
  
  // Update product
  update: (id, productData) => api.put(`/products/${id}`, productData),
  
  // Delete product
  delete: (id) => api.delete(`/products/${id}`),
  
  // Add review to product
  addReview: (id, reviewData) => api.post(`/products/${id}/reviews`, reviewData),
  
  // Get product categories
  getCategories: () => api.get('/products/categories'),
  
  // Get featured products
  getFeatured: () => api.get('/products/featured'),
};

// Bookings API
export const bookingsAPI = {
  // Create new booking
  create: (bookingData) => api.post('/bookings', bookingData),
  
  // Get user's bookings
  getUserBookings: () => api.get('/bookings'),
  
  // Get astrologer's bookings
  getAstrologerBookings: () => api.get('/bookings/astrologer'),
  
  // Get booking by ID
  getById: (id) => api.get(`/bookings/${id}`),
  
  // Update booking status
  updateStatus: (id, status) => api.put(`/bookings/${id}/status`, { status }),
  
  // Add review to booking
  addReview: (id, reviewData) => api.post(`/bookings/${id}/review`, reviewData),
};

// Horoscope API
export const horoscopeAPI = {
  // Get daily horoscope
  getDaily: (sign) => api.get(`/horoscope/daily/${sign}`),
  
  // Get weekly horoscope
  getWeekly: (sign) => api.get(`/horoscope/weekly/${sign}`),
  
  // Get monthly horoscope
  getMonthly: (sign) => api.get(`/horoscope/monthly/${sign}`),
  
  // Get all zodiac signs
  getSigns: () => api.get('/horoscope/signs'),
  
  // Get horoscope by birth date
  getByBirthDate: (birthData) => api.post('/horoscope/birth-date', birthData),
};

// Kundali API
export const kundaliAPI = {
  // Generate kundali
  generate: (kundaliData) => api.post('/kundali/generate', kundaliData),
  
  // Analyze kundali
  analyze: (analysisData) => api.post('/kundali/analysis', analysisData),
  
  // Compatibility analysis
  compatibility: (compatibilityData) => api.post('/kundali/compatibility', compatibilityData),
  
  // Get planetary positions
  getPlanetaryPositions: (positionData) => api.post('/kundali/planetary-positions', positionData),
};

// Users API (Admin only)
export const usersAPI = {
  // Get all users
  getAll: (params = {}) => api.get('/users', { params }),
  
  // Get user by ID
  getById: (id) => api.get(`/users/${id}`),
  
  // Update user
  update: (id, userData) => api.put(`/users/${id}`, userData),
  
  // Delete user
  delete: (id) => api.delete(`/users/${id}`),
};

// Payments API
export const paymentsAPI = {
  // Create payment order
  createOrder: (orderData) => api.post('/payments/create-order', orderData),
  
  // Verify payment
  verifyPayment: (paymentData) => api.post('/payments/verify', paymentData),
  
  // Get payment details
  getPayment: (paymentId) => api.get(`/payments/${paymentId}`),
  
  // Get order details
  getOrder: (orderId) => api.get(`/payments/order/${orderId}`),
  
  // Process refund
  refund: (refundData) => api.post('/payments/refund', refundData),
};

// Chat API
export const chatAPI = {
  // Get chat history
  getHistory: (roomId, params = {}) => api.get(`/chat/${roomId}`, { params }),
  
  // Send message
  sendMessage: (roomId, messageData) => api.post(`/chat/${roomId}/message`, messageData),
  
  // Mark messages as read
  markAsRead: (roomId, messageIds) => api.put(`/chat/${roomId}/read`, { messageIds }),
  
  // Get unread count
  getUnreadCount: () => api.get('/chat/unread-count'),
  
  // Get chat rooms
  getRooms: () => api.get('/chat/rooms'),
  
  // Create or join chat room
  createRoom: (roomData) => api.post('/chat/rooms', roomData),
  
  // Update online status
  updateOnlineStatus: (isOnline) => api.put('/chat/online-status', { isOnline }),
  
  // Get online users
  getOnlineUsers: () => api.get('/chat/online-users'),
};

// Utility functions
export const apiUtils = {
  // Handle API errors
  handleError: (error) => {
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || 'An error occurred';
      return { error: true, message };
    } else if (error.request) {
      // Request was made but no response received
      return { error: true, message: 'Network error. Please check your connection.' };
    } else {
      // Something else happened
      return { error: true, message: 'An unexpected error occurred.' };
    }
  },
  
  // Format API response
  formatResponse: (response) => {
    return {
      success: response.data?.success || false,
      data: response.data?.data || response.data,
      message: response.data?.message || '',
    };
  },
  
  // Upload file
  uploadFile: (file, onProgress) => {
    const formData = new FormData();
    formData.append('file', file);
    
    return api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      },
    });
  },
};

export default api;

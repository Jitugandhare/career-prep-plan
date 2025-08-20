import api from './api'

const authService = {
  // Login user
  login: async (userData) => {
    return await api.post('/auth/login', userData)
  },

  // Register user
  register: async (userData) => {
    return await api.post('/auth/register', userData)
  },

  // Logout user
  logout: async () => {
    return await api.post('/auth/logout')
  },

  // Get current user
  getMe: async () => {
    return await api.get('/auth/me')
  },

  // Update user details
  updateDetails: async (userData) => {
    return await api.put('/auth/updatedetails', userData)
  },

  // Update password
  updatePassword: async (passwordData) => {
    return await api.put('/auth/updatepassword', passwordData)
  },

  // Forgot password
  forgotPassword: async (email) => {
    return await api.post('/auth/forgotpassword', { email })
  },

  // Reset password
  resetPassword: async (token, password) => {
    return await api.put(`/auth/resetpassword/${token}`, { password })
  },

  // Verify email
  verifyEmail: async (token) => {
    return await api.get(`/auth/verifyemail/${token}`)
  },

  // Resend email verification
  resendEmailVerification: async () => {
    return await api.post('/auth/resendverification')
  },

  // Get user by ID (Admin only)
  getUserById: async (id) => {
    return await api.get(`/auth/user/${id}`)
  },

  // Get all users (Admin only)
  getAllUsers: async (params) => {
    return await api.get('/auth/users', { params })
  },
}

export default authService







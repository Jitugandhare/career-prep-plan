import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../../services/authService'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))
const token = localStorage.getItem('token')

const initialState = {
  user: user || null,
  token: token || null,
  isAuthenticated: !!user && !!token,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
}

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const response = await authService.login(userData)
      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('token', response.data.token)
        return response.data
      } else {
        return thunkAPI.rejectWithValue(response.data.message)
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Login failed'
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const response = await authService.register(userData)
      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('token', response.data.token)
        return response.data
      } else {
        return thunkAPI.rejectWithValue(response.data.message)
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Registration failed'
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
})

// Get current user
export const getMe = createAsyncThunk(
  'auth/getMe',
  async (_, thunkAPI) => {
    try {
      const response = await authService.getMe()
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to get user data'
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Update user details
export const updateDetails = createAsyncThunk(
  'auth/updateDetails',
  async (userData, thunkAPI) => {
    try {
      const response = await authService.updateDetails(userData)
      if (response.data.success) {
        // Update localStorage with new user data
        const updatedUser = { ...thunkAPI.getState().auth.user, ...response.data.data }
        localStorage.setItem('user', JSON.stringify(updatedUser))
        return response.data
      } else {
        return thunkAPI.rejectWithValue(response.data.message)
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Update failed'
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Update password
export const updatePassword = createAsyncThunk(
  'auth/updatePassword',
  async (passwordData, thunkAPI) => {
    try {
      const response = await authService.updatePassword(passwordData)
      if (response.data.success) {
        // Update localStorage with new token
        localStorage.setItem('token', response.data.token)
        return response.data
      } else {
        return thunkAPI.rejectWithValue(response.data.message)
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Password update failed'
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Forgot password
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, thunkAPI) => {
    try {
      const response = await authService.forgotPassword(email)
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Password reset failed'
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
    clearError: (state) => {
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.message = ''
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
        state.message = 'Login successful'
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.message = ''
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
        state.message = 'Registration successful'
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.token = null
        state.isAuthenticated = false
        state.isSuccess = false
      })
      // Get Me
      .addCase(getMe.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.data
        state.isAuthenticated = true
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.isAuthenticated = false
      })
      // Update Details
      .addCase(updateDetails.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.message = ''
      })
      .addCase(updateDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload.data
        state.message = 'Profile updated successfully'
      })
      .addCase(updateDetails.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Update Password
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.message = ''
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.token = action.payload.token
        state.message = 'Password updated successfully'
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.message = ''
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload.message
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset, clearError } = authSlice.actions
export default authSlice.reducer

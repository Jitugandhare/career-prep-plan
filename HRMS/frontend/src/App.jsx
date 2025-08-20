import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getMe } from './store/slices/authSlice'
import { getCompanyProfile } from './store/slices/companySlice'
import toast from 'react-hot-toast'

// Components
import Layout from './components/Layout/Layout'
import LoadingSpinner from './components/UI/LoadingSpinner'

// Pages
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import ForgotPassword from './pages/Auth/ForgotPassword'
import ResetPassword from './pages/Auth/ResetPassword'
import Dashboard from './pages/Dashboard/Dashboard'
import Profile from './pages/Profile/Profile'
import Employees from './pages/Employees/Employees'
import Attendance from './pages/Attendance/Attendance'
import Leave from './pages/Leave/Leave'
import Payroll from './pages/Payroll/Payroll'
import Company from './pages/Company/Company'
import Settings from './pages/Settings/Settings'

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />
  }
  
  return children
}

function App() {
  const dispatch = useDispatch()
  const { isAuthenticated, isLoading, user } = useSelector((state) => state.auth)
  const { isSuccess, isError, message } = useSelector((state) => state.auth)
  const { isLoading: companyLoading } = useSelector((state) => state.company)

  useEffect(() => {
    // Check if user is authenticated on app load
    if (isAuthenticated && user) {
      dispatch(getMe())
      dispatch(getCompanyProfile())
    }
  }, [dispatch, isAuthenticated, user])

  useEffect(() => {
    if (isSuccess && message) {
      toast.success(message)
    }
    if (isError && message) {
      toast.error(message)
    }
  }, [isSuccess, isError, message])

  // Show loading spinner while checking authentication
  if (isLoading || companyLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
        } />
        <Route path="/register" element={
          !isAuthenticated ? (
            <Navigate to="/login" replace />
          ) : (
            user?.role === 'super_admin' ? <Register /> : <Navigate to="/dashboard" replace />
          )
        } />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="employees" element={
            <ProtectedRoute allowedRoles={['admin', 'super_admin', 'manager']}>
              <Employees />
            </ProtectedRoute>
          } />
          <Route path="attendance" element={<Attendance />} />
          <Route path="leave" element={<Leave />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="company" element={
            <ProtectedRoute allowedRoles={['admin', 'super_admin']}>
              <Company />
            </ProtectedRoute>
          } />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  )
}

export default App



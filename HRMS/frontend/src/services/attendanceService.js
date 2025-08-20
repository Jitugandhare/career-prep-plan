import api from './api'

const attendanceService = {
  // Employee self-service
  clockIn: async () => {
    return await api.post('/attendance/clockin')
  },
  clockOut: async () => {
    return await api.post('/attendance/clockout')
  },
  getMyAttendance: async (params) => {
    return await api.get('/attendance/my-attendance', { params })
  },
  requestLateWaiver: async (data) => {
    return await api.post('/attendance/late-waiver', data)
  },

  // Admin/Manager
  getReport: async (params) => {
    return await api.get('/attendance/report', { params })
  },
  manualEntry: async (data) => {
    return await api.post('/attendance/manual-entry', data)
  },
  getEmployeeAttendance: async (employeeId, params) => {
    return await api.get(`/attendance/${employeeId}/attendance`, { params })
  },
}

export default attendanceService



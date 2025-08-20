import api from './api'

const leaveService = {
  // Employee self-service
  requestLeave: async (data) => {
    return await api.post('/leave/request', data)
  },
  getMyRequests: async (params) => {
    return await api.get('/leave/my-requests', { params })
  },
  getMyBalance: async () => {
    return await api.get('/leave/balance')
  },
  cancelMyRequest: async (id) => {
    return await api.put(`/leave/${id}/cancel`)
  },

  // Admin/Manager
  getAllRequests: async (params) => {
    return await api.get('/leave/requests', { params })
  },
  approveRequest: async (id, data) => {
    return await api.put(`/leave/${id}/approve`, data)
  },
  getEmployeeBalance: async (employeeId) => {
    return await api.get(`/leave/${employeeId}/balance`)
  },
}

export default leaveService



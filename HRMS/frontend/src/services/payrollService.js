import api from './api'

const payrollService = {
  // Employee self-service
  getSalaryStructure: async () => {
    return await api.get('/payroll/salary-structure')
  },
  getSalarySlip: async (month, year) => {
    return await api.get(`/payroll/salary-slip/${month}/${year}`)
  },

  // Admin
  generateSalary: async (payload) => {
    return await api.post('/payroll/generate-salary', payload)
  },
  getReport: async (params) => {
    return await api.get('/payroll/report', { params })
  },
  updateSalaryStructure: async (employeeId, data) => {
    return await api.put(`/payroll/salary-structure/${employeeId}`, data)
  },
}

export default payrollService



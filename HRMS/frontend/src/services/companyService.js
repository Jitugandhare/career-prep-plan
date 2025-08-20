import api from './api'

const companyService = {
  // Get company profile
  getProfile: async () => {
    return await api.get('/company/profile')
  },

  // Update company profile
  updateProfile: async (profileData) => {
    return await api.put('/company/profile', profileData)
  },

  // Get all departments
  getDepartments: async (params) => {
    return await api.get('/company/departments', { params })
  },

  // Get department by ID
  getDepartmentById: async (id) => {
    return await api.get(`/company/departments/${id}`)
  },

  // Create department
  createDepartment: async (departmentData) => {
    return await api.post('/company/departments', departmentData)
  },

  // Update department
  updateDepartment: async (id, departmentData) => {
    return await api.put(`/company/departments/${id}`, departmentData)
  },

  // Delete department
  deleteDepartment: async (id) => {
    return await api.delete(`/company/departments/${id}`)
  },

  // Get all sections
  getSections: async (params) => {
    return await api.get('/company/sections', { params })
  },

  // Create section
  createSection: async (sectionData) => {
    return await api.post('/company/sections', sectionData)
  },

  // Get all shift categories
  getShiftCategories: async (params) => {
    return await api.get('/company/shifts', { params })
  },

  // Create shift category
  createShiftCategory: async (shiftData) => {
    return await api.post('/company/shifts', shiftData)
  },

  // Get all holidays
  getHolidays: async (params) => {
    return await api.get('/company/holidays', { params })
  },

  // Create holiday
  createHoliday: async (holidayData) => {
    return await api.post('/company/holidays', holidayData)
  },

  // Get all company events
  getCompanyEvents: async (params) => {
    return await api.get('/company/events', { params })
  },

  // Create company event
  createCompanyEvent: async (eventData) => {
    return await api.post('/company/events', eventData)
  },

  // Get organizational structure
  getStructure: async () => {
    return await api.get('/company/structure')
  },
}

export default companyService







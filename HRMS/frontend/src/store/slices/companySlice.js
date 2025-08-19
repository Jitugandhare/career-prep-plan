import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import companyService from '../../services/companyService'

const initialState = {
  company: null,
  departments: [],
  sections: [],
  shifts: [],
  holidays: [],
  events: [],
  structure: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
}

// Get company profile
export const getCompanyProfile = createAsyncThunk(
  'company/getProfile',
  async (_, thunkAPI) => {
    try {
      const response = await companyService.getProfile()
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to get company profile'
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get all departments
export const getDepartments = createAsyncThunk(
  'company/getDepartments',
  async (params, thunkAPI) => {
    try {
      const response = await companyService.getDepartments(params)
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to get departments'
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Create department
export const createDepartment = createAsyncThunk(
  'company/createDepartment',
  async (departmentData, thunkAPI) => {
    try {
      const response = await companyService.createDepartment(departmentData)
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to create department'
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get organizational structure
export const getOrganizationalStructure = createAsyncThunk(
  'company/getStructure',
  async (_, thunkAPI) => {
    try {
      const response = await companyService.getStructure()
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to get organizational structure'
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const companySlice = createSlice({
  name: 'company',
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
      // Get Company Profile
      .addCase(getCompanyProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCompanyProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.company = action.payload.data
      })
      .addCase(getCompanyProfile.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Get Departments
      .addCase(getDepartments.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getDepartments.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.departments = action.payload.data
      })
      .addCase(getDepartments.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Create Department
      .addCase(createDepartment.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.message = ''
      })
      .addCase(createDepartment.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.departments.push(action.payload.data)
        state.message = 'Department created successfully'
      })
      .addCase(createDepartment.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Get Structure
      .addCase(getOrganizationalStructure.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOrganizationalStructure.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.structure = action.payload.data
      })
      .addCase(getOrganizationalStructure.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset, clearError } = companySlice.actions
export default companySlice.reducer

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  employees: [],
  currentEmployee: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
}

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
    setEmployees: (state, action) => {
      state.employees = action.payload
    },
    setCurrentEmployee: (state, action) => {
      state.currentEmployee = action.payload
    },
    addEmployee: (state, action) => {
      state.employees.push(action.payload)
    },
    updateEmployee: (state, action) => {
      const index = state.employees.findIndex(emp => emp._id === action.payload._id)
      if (index !== -1) {
        state.employees[index] = action.payload
      }
    },
    removeEmployee: (state, action) => {
      state.employees = state.employees.filter(emp => emp._id !== action.payload)
    },
  },
})

export const { reset, setEmployees, setCurrentEmployee, addEmployee, updateEmployee, removeEmployee } = employeeSlice.actions
export default employeeSlice.reducer







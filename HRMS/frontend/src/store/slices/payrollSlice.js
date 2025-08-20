import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  salaryStructure: null,
  salarySlips: [],
  currentSalarySlip: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
}

export const payrollSlice = createSlice({
  name: 'payroll',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
    setSalaryStructure: (state, action) => {
      state.salaryStructure = action.payload
    },
    setSalarySlips: (state, action) => {
      state.salarySlips = action.payload
    },
    setCurrentSalarySlip: (state, action) => {
      state.currentSalarySlip = action.payload
    },
    addSalarySlip: (state, action) => {
      state.salarySlips.push(action.payload)
    },
    updateSalarySlip: (state, action) => {
      const index = state.salarySlips.findIndex(slip => slip._id === action.payload._id)
      if (index !== -1) {
        state.salarySlips[index] = action.payload
      }
    },
  },
})

export const { reset, setSalaryStructure, setSalarySlips, setCurrentSalarySlip, addSalarySlip, updateSalarySlip } = payrollSlice.actions
export default payrollSlice.reducer







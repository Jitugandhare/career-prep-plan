import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  leaves: [],
  leaveTypes: [],
  leaveBalance: {},
  currentLeave: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
}

export const leaveSlice = createSlice({
  name: 'leave',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
    setLeaves: (state, action) => {
      state.leaves = action.payload
    },
    setLeaveTypes: (state, action) => {
      state.leaveTypes = action.payload
    },
    setLeaveBalance: (state, action) => {
      state.leaveBalance = action.payload
    },
    setCurrentLeave: (state, action) => {
      state.currentLeave = action.payload
    },
    addLeave: (state, action) => {
      state.leaves.push(action.payload)
    },
    updateLeave: (state, action) => {
      const index = state.leaves.findIndex(leave => leave._id === action.payload._id)
      if (index !== -1) {
        state.leaves[index] = action.payload
      }
    },
  },
})

export const { reset, setLeaves, setLeaveTypes, setLeaveBalance, setCurrentLeave, addLeave, updateLeave } = leaveSlice.actions
export default leaveSlice.reducer

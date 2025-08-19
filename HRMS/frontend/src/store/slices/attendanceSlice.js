import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  attendance: [],
  currentAttendance: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
}

export const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
    setAttendance: (state, action) => {
      state.attendance = action.payload
    },
    setCurrentAttendance: (state, action) => {
      state.currentAttendance = action.payload
    },
    addAttendance: (state, action) => {
      state.attendance.push(action.payload)
    },
    updateAttendance: (state, action) => {
      const index = state.attendance.findIndex(att => att._id === action.payload._id)
      if (index !== -1) {
        state.attendance[index] = action.payload
      }
    },
  },
})

export const { reset, setAttendance, setCurrentAttendance, addAttendance, updateAttendance } = attendanceSlice.actions
export default attendanceSlice.reducer

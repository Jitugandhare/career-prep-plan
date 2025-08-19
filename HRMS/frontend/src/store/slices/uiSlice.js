import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarOpen: false,
  theme: 'light',
  notifications: [],
  modals: {
    login: false,
    register: false,
    forgotPassword: false,
    profile: false,
    settings: false,
  },
  loadingStates: {},
  toast: {
    show: false,
    message: '',
    type: 'info', // success, error, warning, info
  },
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', state.theme)
    },
    setTheme: (state, action) => {
      state.theme = action.payload
      localStorage.setItem('theme', state.theme)
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
      })
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      )
    },
    clearNotifications: (state) => {
      state.notifications = []
    },
    openModal: (state, action) => {
      state.modals[action.payload] = true
    },
    closeModal: (state, action) => {
      state.modals[action.payload] = false
    },
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach((key) => {
        state.modals[key] = false
      })
    },
    setLoadingState: (state, action) => {
      const { key, isLoading } = action.payload
      state.loadingStates[key] = isLoading
    },
    showToast: (state, action) => {
      state.toast = {
        show: true,
        message: action.payload.message,
        type: action.payload.type || 'info',
      }
    },
    hideToast: (state) => {
      state.toast.show = false
    },
    resetUI: (state) => {
      state.sidebarOpen = false
      state.modals = initialState.modals
      state.notifications = []
      state.toast = initialState.toast
    },
  },
})

export const {
  toggleSidebar,
  setSidebarOpen,
  toggleTheme,
  setTheme,
  addNotification,
  removeNotification,
  clearNotifications,
  openModal,
  closeModal,
  closeAllModals,
  setLoadingState,
  showToast,
  hideToast,
  resetUI,
} = uiSlice.actions

export default uiSlice.reducer

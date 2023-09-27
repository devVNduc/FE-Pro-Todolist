import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/redux/auth'
export const store = configureStore({
  reducer: {
    auth: authReducer
  },
})
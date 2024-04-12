import { configureStore } from '@reduxjs/toolkit'
import dailySlice from './slices/dailySlice'
import userSlice from './slices/userSlice'

export const store = configureStore({
  reducer: {
    daily: dailySlice,
    user: userSlice
  },
})
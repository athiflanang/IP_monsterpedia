import { configureStore } from '@reduxjs/toolkit'
import fetchingApi from '../features/fetchingApi'

export const store = configureStore({
  reducer: {
    fetchingApi
  }
})
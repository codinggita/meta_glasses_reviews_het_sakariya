import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import reviewReducer from './reviewSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    reviews: reviewReducer,
  },
});

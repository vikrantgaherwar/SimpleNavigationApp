// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice';
import orderReducer from './orderReducer';
import paymentReducer from './paymentReducer';

export const store = configureStore({
  reducer: {
    data: dataReducer,
    order: orderReducer,
    payment: paymentReducer,
  },
});

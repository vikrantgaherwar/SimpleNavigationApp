import { createSlice } from '@reduxjs/toolkit';
import { startPayment } from './actions';

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetPayment: state => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(startPayment.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startPayment.fulfilled, state => {
        state.loading = false;
        state.success = true;
      })
      .addCase(startPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPayment } = paymentSlice.actions;
export default paymentSlice.reducer;

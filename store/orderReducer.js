import { createSlice } from '@reduxjs/toolkit';
import { createOrder } from './actions';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderData: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetOrder: state => {
      state.orderData = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createOrder.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderData = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { fetchData } from './actions';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    data: { medicines: [], totalPages: 0, currentPage: 1 },
    loading: false,
    hasMore: true,
    error: null,
  },
  reducers: {
    resetData: state => {
      state.data = { medicines: [], totalPages: 0, currentPage: 1 };
      state.loading = false;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.hasMore = action.payload.currentPage < action.payload.totalPages;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetData } = dataSlice.actions;
export default dataSlice.reducer;

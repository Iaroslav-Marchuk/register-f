import { createSlice } from '@reduxjs/toolkit';
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getTodayOrders,
} from './operations.js';

const handlePending = key => state => {
  state[key].isLoading = true;
  state[key].error = null;
};

const handleRejected = key => (state, action) => {
  state[key].isLoading = false;
  state[key].error = action.payload;
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    all: { orders: [], pagination: {}, isLoading: false, error: null },
    today: { orders: [], pagination: {}, isLoading: false, error: null },
    create: { isLoading: false, error: null },
    edit: { isLoading: false, error: null },
    delete: { isLoading: false, error: null },
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllOrders.pending, handlePending('all'))
      .addCase(getAllOrders.fulfilled, (state, action) => {
        const { orders, ...pagination } = action.payload;
        state.all.orders = orders;
        state.all.pagination = {
          totalItems: pagination.totalItems,
          totalPages: pagination.totalPages,
          hasNextPage: pagination.hasNextPage,
          hasPreviousPage: pagination.hasPreviousPage,
        };
        state.all.isLoading = false;
      })
      .addCase(getAllOrders.rejected, handleRejected('all'))

      .addCase(getTodayOrders.pending, handlePending('today'))
      .addCase(getTodayOrders.fulfilled, (state, action) => {
        const { orders, ...pagination } = action.payload;
        state.today.orders = orders;
        state.today.pagination = {
          totalItems: pagination.totalItems,
          totalPages: pagination.totalPages,
          hasNextPage: pagination.hasNextPage,
          hasPreviousPage: pagination.hasPreviousPage,
        };
        state.today.isLoading = false;
      })
      .addCase(getTodayOrders.rejected, handleRejected('today'))

      .addCase(createOrder.pending, handlePending('create'))
      .addCase(createOrder.fulfilled, state => {
        state.create.isLoading = false;
      })
      .addCase(createOrder.rejected, handleRejected('create'))

      .addCase(deleteOrder.pending, handlePending('delete'))
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.delete.isLoading = false;
        state.today.orders = state.today.orders.filter(
          order => order._id !== action.payload
        );
      })
      .addCase(deleteOrder.rejected, handleRejected('delete'));
  },
});

export default ordersSlice.reducer;

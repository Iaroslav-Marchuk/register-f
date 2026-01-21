import { createSlice } from '@reduxjs/toolkit';
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getTodayOrders,
  updateOrder,
} from './operations.js';

const handlePending = key => state => {
  state[key].isLoading = true;
  state[key].error = null;
};

const handleRejected = key => (state, action) => {
  state[key].isLoading = false;
  state[key].error = action.payload;
};

const calculateStats = orders => {
  const totalCompleted = orders.reduce((sum, o) => sum + o.order.completed, 0);
  const totalM2 = orders.reduce((sum, o) => sum + o.order.m2, 0);
  const ratio = totalCompleted ? totalM2 / totalCompleted : 0;
  return { totalCompleted, totalM2, ratio };
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    all: { orders: [], pagination: {}, isLoading: false, error: null },
    today: {
      orders: [],
      pagination: {},
      stats: {},
      isLoading: false,
      error: null,
    },
    create: { isLoading: false, error: null },
    update: { isLoading: false, error: null },
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
        const {
          orders,
          totalItems,
          totalPages,
          hasNextPage,
          hasPreviousPage,
          totalCompleted,
          totalM2,
          ratio,
        } = action.payload;

        state.today.orders = orders;
        state.today.stats = {
          totalCompleted,
          totalM2,
          ratio,
        };
        state.today.pagination = {
          totalItems,
          totalPages,
          hasNextPage,
          hasPreviousPage,
        };
        state.today.isLoading = false;
      })
      .addCase(getTodayOrders.rejected, handleRejected('today'))

      .addCase(createOrder.pending, handlePending('create'))
      .addCase(createOrder.fulfilled, state => {
        state.create.isLoading = false;
      })
      .addCase(createOrder.rejected, handleRejected('create'))

      .addCase(updateOrder.pending, handlePending('update'))
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.update.isLoading = false;
        const updatedOrder = action.payload.updatedOrder;
        const index = state.today.orders.findIndex(
          order => order._id === updatedOrder._id
        );
        if (index !== -1) {
          state.today.orders[index] = updatedOrder;
        }
        state.today.stats = calculateStats(state.today.orders);
      })
      .addCase(updateOrder.rejected, handleRejected('update'))

      .addCase(deleteOrder.pending, handlePending('delete'))
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.delete.isLoading = false;
        state.today.orders = state.today.orders.filter(
          order => order._id !== action.payload
        );
        state.today.stats = calculateStats(state.today.orders);
      })
      .addCase(deleteOrder.rejected, handleRejected('delete'));
  },
});

export default ordersSlice.reducer;

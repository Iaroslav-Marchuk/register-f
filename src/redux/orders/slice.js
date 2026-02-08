import { createSlice } from '@reduxjs/toolkit';
import {
  createOrder,
  createRecoveryOrder,
  deleteOrder,
  editOrder,
  getAllOrders,
  getTodayOrders,
  getUserDailyActivity,
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
  const totalCompleted = orders.reduce((sum, o) => sum + o.completedItems, 0);
  const totalM2 = orders.reduce((sum, o) => sum + o.completedM2, 0);
  const ratio = totalCompleted ? totalM2 / totalCompleted : 0;
  return { totalCompleted, totalM2, ratio };
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    all: {
      orders: [],
      pagination: {
        totalItems: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      },
      isLoading: false,
      error: null,
    },
    today: {
      orders: [],
      pagination: {
        totalItems: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      },
      stats: {
        totalCompleted: 0,
        totalM2: 0,
        ratio: 0,
      },
      isLoading: false,
      error: null,
    },
    activity: {
      dailyActivity: [],
      isLoading: false,
      error: null,
    },
    create: { isLoading: false, error: null },
    recovery: { isLoading: false, error: null },
    update: { isLoading: false, error: null },
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

      .addCase(createRecoveryOrder.pending, handlePending('recovery'))
      .addCase(createRecoveryOrder.fulfilled, state => {
        state.recovery.isLoading = false;
      })
      .addCase(createRecoveryOrder.rejected, handleRejected('recovery'))

      .addCase(updateOrder.pending, handlePending('update'))
      .addCase(updateOrder.fulfilled, state => {
        state.update.isLoading = false;
      })
      .addCase(updateOrder.rejected, handleRejected('update'))

      .addCase(editOrder.pending, handlePending('edit'))
      .addCase(editOrder.fulfilled, (state, action) => {
        state.edit.isLoading = false;
        const editedOrder = action.payload.order;
        const index = state.today.orders.findIndex(
          order => order._id === editedOrder._id
        );
        if (index !== -1) {
          state.today.orders[index] = editedOrder;
        }
        state.today.stats = calculateStats(state.today.orders);
      })
      .addCase(editOrder.rejected, handleRejected('edit'))

      .addCase(deleteOrder.pending, handlePending('delete'))
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.delete.isLoading = false;
        state.today.orders = state.today.orders.filter(
          order => order._id !== action.payload
        );
        state.today.stats = calculateStats(state.today.orders);
      })
      .addCase(deleteOrder.rejected, handleRejected('delete'))

      .addCase(getUserDailyActivity.pending, handlePending('activity'))
      .addCase(getUserDailyActivity.fulfilled, (state, action) => {
        state.activity.isLoading = false;
        state.activity.dailyActivity = action.payload;
      })
      .addCase(getUserDailyActivity.rejected, handleRejected('activity'));
  },
});

export default ordersSlice.reducer;

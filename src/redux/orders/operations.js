import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../services/api.js';

export const getAllOrders = createAsyncThunk(
  'orders/getAllOrders',
  async (
    {
      page = 1,
      perPage = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      filter = {},
    } = {},
    thunkAPI
  ) => {
    try {
      const response = await axiosAPI.get('/orders', {
        params: { page, perPage, sortBy, sortOrder, ...filter },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getTodayOrders = createAsyncThunk(
  'orders/getTodayOrders',
  async (
    { page = 1, perPage = 10, sortBy = 'createdAt', sortOrder = 'desc' } = {},
    thunkAPI
  ) => {
    try {
      const response = await axiosAPI.get('/orders/today', {
        params: { page, perPage, sortBy, sortOrder },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const existOrder = createAsyncThunk(
  'orders/existOrder',
  async (values, thunkAPI) => {
    try {
      const response = await axiosAPI.post('/orders/existOrder', values);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (values, thunkAPI) => {
    try {
      const response = await axiosAPI.post('/orders', values);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const createRecoveryOrder = createAsyncThunk(
  'orders/createRecoveryOrder',
  async (values, thunkAPI) => {
    try {
      const response = await axiosAPI.post('/orders/recovery', values);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async (values, thunkAPI) => {
    try {
      const response = await axiosAPI.post('/orders/update', values);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const editOrder = createAsyncThunk(
  'orders/editOrder',
  async ({ orderId, values }, thunkAPI) => {
    try {
      const response = await axiosAPI.patch(`/orders/${orderId}`, values);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (orderId, thunkAPI) => {
    try {
      const response = await axiosAPI.delete(`/orders/${orderId}`);
      return response.data.orderId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getUserDailyActivity = createAsyncThunk(
  'orders/getUserDailyActivity',
  async (year, thunkAPI) => {
    try {
      const response = await axiosAPI.get(`/orders/activity/${year}`);
      return response.data.activity;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getFullStatisticForYear = createAsyncThunk(
  'orders/getFullStatisticForYear',
  async (year, thunkAPI) => {
    try {
      const response = await axiosAPI.get(`/orders/statistics/${year}`);
      return response.data.statistics;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

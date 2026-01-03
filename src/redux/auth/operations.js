import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../services/api.js';

export const register = createAsyncThunk(
  'auth/register',
  async (values, thunkAPI) => {
    try {
      await axiosAPI.post('/auth/register', values);
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (values, thunkAPI) => {
    try {
      const response = await axiosAPI.post('/auth/login', values);

      const { user } = response.data;

      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await axiosAPI.post('/auth/logout');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const refresh = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  try {
    const response = await axiosAPI.post('/auth/refresh');
    return response.data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const getCurrentUser = createAsyncThunk(
  'auth/currentUser',
  async (_, thunkAPI) => {
    try {
      const response = await axiosAPI.get('/auth/currentUser');
      const currentUser = response.data.currentUser;

      return currentUser;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

import { createSlice } from '@reduxjs/toolkit';
import {
  changeLocal,
  changePassword,
  getCurrentUser,
  logIn,
  logOut,
  refresh,
  register,
} from './operations.js';

const handlePending = state => {
  state.isUserLoading = true;
  state.authError = null;
};

const handleRejected = (state, action) => {
  state.isUserLoading = false;
  state.authError = action.payload;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      name: null,
      email: null,
      local: null,
    },
    isLoggedIn: false,
    isUserLoading: false,
    isRefreshing: false,
    authError: null,
  },

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, state => {
        state.isUserLoading = false;
      })
      .addCase(register.rejected, handleRejected)

      .addCase(logIn.pending, handlePending)
      .addCase(logIn.fulfilled, (state, action) => {
        state.isUserLoading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        state.authError = null;
      })
      .addCase(logIn.rejected, handleRejected)

      .addCase(logOut.pending, handlePending)
      .addCase(logOut.fulfilled, state => {
        state.isUserLoading = false;
        state.user = { name: null, email: null, local: null };
        state.isLoggedIn = false;
        state.authError = null;
      })
      .addCase(logOut.rejected, handleRejected)

      .addCase(refresh.pending, state => {
        state.isRefreshing = true;
        state.authError = null;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.authError = null;
      })
      .addCase(refresh.rejected, state => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
        state.authError = null;
      })

      .addCase(getCurrentUser.pending, handlePending)
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isUserLoading = false;
        state.user = action.payload;
        state.authError = null;
      })
      .addCase(getCurrentUser.rejected, handleRejected)

      .addCase(changeLocal.pending, handlePending)
      .addCase(changeLocal.fulfilled, (state, action) => {
        state.isUserLoading = false;
        state.user = action.payload;
        state.authError = null;
      })
      .addCase(changeLocal.rejected, handleRejected)

      .addCase(changePassword.pending, handlePending)
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isUserLoading = false;
        state.user = action.payload;
        state.authError = null;
      })
      .addCase(changePassword.rejected, handleRejected);
  },
});

export default authSlice.reducer;

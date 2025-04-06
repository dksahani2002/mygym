import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';
import Cookies from 'js-cookie';

// Fetch profile async action
export const fetchProfile = createAsyncThunk('profile/fetch', async (_, thunkAPI) => {
  const token = Cookies.get('token');
  const res = await api.get('/user/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  return res.data;
});

// Save profile async action
export const saveProfile = createAsyncThunk('profile/save', async (profileData, thunkAPI) => {
  const token = Cookies.get('token');
  const res = await api.put('/user/profile', profileData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
});

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: null,
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Failed to fetch profile';
      })
      .addCase(saveProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.status = 'succeeded';
      })
      .addCase(saveProfile.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Failed to update profile';
      });
  },
});

export default profileSlice.reducer;

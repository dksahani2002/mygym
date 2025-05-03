import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

// Async thunks
export const fetchProgress = createAsyncThunk('progress/fetchProgress', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/progress');
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const addProgress = createAsyncThunk('progress/logProgress', async (progressData, { rejectWithValue }) => {
  try {
    const res = await api.post('/progress/log', progressData);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const editProgress = createAsyncThunk('progress/updateProgress', async (progressData, { rejectWithValue }) => {
  try {
    const { _id, ...updateData } = progressData;
    const res = await api.put(`/progress/${_id}`, updateData);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const removeProgress = createAsyncThunk('progress/deleteProgress', async (progressId, { rejectWithValue }) => {
  try {
    await api.delete(`/progress/${progressId}`);
    return progressId;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// Slice
const progressSlice = createSlice({
  name: 'progress',
  initialState: {
    progress: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progress = action.payload;
      })
      .addCase(fetchProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addProgress.fulfilled, (state, action) => {
        state.progress.push(action.payload);
      })
      .addCase(editProgress.fulfilled, (state, action) => {
        const index = state.progress.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          state.progress[index] = action.payload;
        }
      })
      .addCase(removeProgress.fulfilled, (state, action) => {
        state.progress = state.progress.filter(item => item._id !== action.payload);
      });
  }
});

export default progressSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

// Async thunks
export const fetchWorkouts = createAsyncThunk('workouts/fetchWorkouts', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/workout');
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const addWorkout = createAsyncThunk('workouts/addWorkout', async (mealData, { rejectWithValue }) => {
  try {
    const res = await api.post('/workout/log', mealData );
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const editWorkout = createAsyncThunk('workouts/editWorkout', async (workoutData, { rejectWithValue }) => {
  try {
    const { _id, ...updateData } = workoutData;
    const res = await api.put(`/workout/${_id}`, updateData );
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const removeWorkout = createAsyncThunk('workouts/removeWorkout', async (workoutId, { rejectWithValue }) => {
  try {
    await api.delete(`/workout/${workoutId}`);
    return workoutId;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// Slice
const workoutSlice = createSlice({
  name: 'workouts',
  initialState: {
    workouts: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkouts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkouts.fulfilled, (state, action) => {
        state.loading = false;
        state.workouts = action.payload;
      })
      .addCase(fetchWorkouts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addWorkout.fulfilled, (state, action) => {
        state.workouts.push(action.payload);
      })
      .addCase(editWorkout.fulfilled, (state, action) => {
        const index = state.workouts.findIndex(workout => workout._id === action.payload._id);
        if (index !== -1) {
          state.workouts[index] = action.payload;
        }
      })
      .addCase(removeWorkout.fulfilled, (state, action) => {
        state.workouts = state.workouts.filter(workout => workout._id !== action.payload);
      });
  }
});

export default workoutSlice.reducer;

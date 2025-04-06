import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';
import Cookies from 'js-cookie';

// Async thunks

export const fetchMeals = createAsyncThunk('meals/fetchMeals', async (_, { rejectWithValue }) => {
  try {
    const token = Cookies.get('token');
    const res = await api.get('/meal', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const addMeal = createAsyncThunk('meals/addMeal', async (mealData, { rejectWithValue }) => {
  try {
    const token = Cookies.get('token');
    const res = await api.post('/meal/log', mealData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const editMeal = createAsyncThunk('meals/editMeal', async (mealData, { rejectWithValue }) => {
  try {
    const token = Cookies.get('token');
    const { _id, ...updateData } = mealData;
    const res = await api.put(`/meal/${_id}`, updateData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const removeMeal = createAsyncThunk('meals/removeMeal', async (mealId, { rejectWithValue }) => {
  try {
    const token = Cookies.get('token');
    await api.delete(`/meal/${mealId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return mealId;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// Slice
const mealSlice = createSlice({
  name: 'meals',
  initialState: {
    meals: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        state.loading = false;
        state.meals = action.payload;
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addMeal.fulfilled, (state, action) => {
        state.meals.push(action.payload);
      })
      .addCase(editMeal.fulfilled, (state, action) => {
        const index = state.meals.findIndex(meal => meal._id === action.payload._id);
        if (index !== -1) {
          state.meals[index] = action.payload;
        }
      })
      .addCase(removeMeal.fulfilled, (state, action) => {
        state.meals = state.meals.filter(meal => meal._id !== action.payload);
      });
  }
});

export default mealSlice.reducer;

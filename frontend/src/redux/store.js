import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';  
import mealRedcuer from './slices/mealSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    meals:mealRedcuer,
  },
  devTools: import.meta.env.MODE !== 'production', // Optional: enable Redux devtools only in development
});

export default store;

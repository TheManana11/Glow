// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import analysisReducer from '../slices/analysis';

export const store = configureStore({
  reducer: {
    analysis: analysisReducer,
  },
});

export default store;

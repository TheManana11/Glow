import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  analysis: [],        
};

const analysisSlice = createSlice({
  name: 'analysis',
  initialState,
  reducers: {
    setAll(state, action) {
      state.analysis = action.payload;
    },
    addOne(state, action) {
      state.analysis.push(action.payload);
    },
    clearAll(state) {
      state.analysis = [];
    },
  },
});

export const { setAll, addOne, clearAll } = analysisSlice.actions;

export const selectAnalysis = (state) => state.analysis.analysis;

export default analysisSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LetterCountState {
  count: number;
}

const initialState: LetterCountState = {
  count: 0,
};

const letterCountSlice = createSlice({
  name: 'letterCount',
  initialState,
  reducers: {
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
  },
});

export const { setCount } = letterCountSlice.actions;
export default letterCountSlice.reducer;

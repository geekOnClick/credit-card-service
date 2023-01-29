import { createSlice } from '@reduxjs/toolkit';

const rangeSlice = createSlice({
    name: '@@range',
    initialState: {
        amount: 15000,
    },
    reducers: {
        changeValue: (state, action) => {
            state.amount = action.payload;
        },
    },
});
export const rangeReducer = rangeSlice.reducer;
export const { changeValue } = rangeSlice.actions;

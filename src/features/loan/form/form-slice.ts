import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
    name: '@@form',
    initialState: {
        stages: {
            firstStep: {},
            secondStep: {},
            thirdStep: {},
        },
        loading: false,
        error: false,
    },
    reducers: {
        changeStepData: (state, action) => {
            switch (action.payload.stepNum) {
                case 'first':
                    state.stages.firstStep = action.payload.data;
                    break;
                case 'second':
                    state.stages.secondStep = action.payload.data;
                    break;
                case 'third':
                    state.stages.thirdStep = action.payload.data;
                    break;
                default:
                    state.stages;
            }
        },
        changeLoading: (state, action) => {
            state.loading = action.payload;
        },
        changeError: (state, action) => {
            state.error = action.payload;
        },
    },
});
export const formReducer = formSlice.reducer;
export const { changeStepData, changeLoading, changeError } = formSlice.actions;

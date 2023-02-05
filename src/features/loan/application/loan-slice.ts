import { createSlice } from '@reduxjs/toolkit';

const loanSlice = createSlice({
    name: '@@loan',
    initialState: {
        stages: {
            stage: 1,
            range: 15000,
            offers: [],
            offer_id: null,
        },
        loading: false,
        error: false,
    },
    reducers: {
        changeLoanData: (state, action) => {
            switch (action.payload.stage) {
                case 1:
                    state.stages.stage = 2;
                    state.stages.offers = action.payload.data;
                    break;
                case 2:
                    state.stages.stage = 3;
                    state.stages.range = 15000;
                    state.stages.offers = [];
                    state.stages.offer_id = action.payload.id;
                    break;
                case 0:
                    state.stages.stage = 1;
                    state.stages.offer_id = null;
                    state.stages.range = 15000;
                    state.stages.offers = [];
                    break;
                default:
                    state.stages;
            }
        },
        changeRangeValue: (state, action) => {
            state.stages.range = action.payload;
        },
        changeLoading: (state, action) => {
            state.loading = action.payload;
        },
        changeError: (state, action) => {
            state.error = action.payload;
        },
    },
});
export const loanReducer = loanSlice.reducer;
export const { changeLoanData, changeLoading, changeError, changeRangeValue } = loanSlice.actions;

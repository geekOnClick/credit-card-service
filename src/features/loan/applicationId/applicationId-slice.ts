import { createSlice } from '@reduxjs/toolkit';

export interface IApplicationId {
    stages: {
        stageDone: boolean;
        stageData: null;
        scheduleData: Array<{
            number: number;
            date: string;
            totalPayment: number;
            interestPayment: number;
            debtPayment: number;
            remainingDebt: number;
        }>;
        scheduleChecked: boolean;
        documentChecked: boolean;
        sesCode: string;
    };
    loading: boolean;
    error: boolean;
}
const initialState: IApplicationId = {
    stages: {
        stageDone: false,
        stageData: null,
        scheduleData: [],
        scheduleChecked: false,
        documentChecked: false,
        sesCode: '',
    },
    loading: false,
    error: false,
};

const applicationIdSlice = createSlice({
    name: '@@applicationId',
    initialState: initialState,
    reducers: {
        changeStepDone: (state, action) => {
            state.stages.stageDone = action.payload;
        },
        changeStepData: (state, action) => {
            state.stages.stageData = action.payload;
        },
        changeScheduleData: (state, action) => {
            state.stages.scheduleData = action.payload;
        },
        changescheduleChecked: (state, action) => {
            state.stages.scheduleChecked = action.payload;
        },
        changedocumentChecked: (state, action) => {
            state.stages.documentChecked = action.payload;
        },
        changeSesCode: (state, action) => {
            state.stages.sesCode = action.payload;
        },
        changeLoading: (state, action) => {
            state.loading = action.payload;
        },
        changeError: (state, action) => {
            state.error = action.payload;
        },
    },
});
export const applicationIdReducer = applicationIdSlice.reducer;
export const {
    changeStepDone,
    changeStepData,
    changeScheduleData,
    changescheduleChecked,
    changedocumentChecked,
    changeSesCode,
    changeLoading,
    changeError,
} = applicationIdSlice.actions;

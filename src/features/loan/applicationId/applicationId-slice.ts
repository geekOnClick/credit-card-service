import { createSlice } from '@reduxjs/toolkit';

const applicationIdSlice = createSlice({
    name: '@@applicationId',
    initialState: {
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
    },
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

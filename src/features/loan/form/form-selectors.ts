import { RootState } from 'store';

export const selectFormStages = (state: RootState) => state.form.stages;
export const selectFormLoading = (state: RootState) => state.form.loading;
export const selectFormError = (state: RootState) => state.form.error;

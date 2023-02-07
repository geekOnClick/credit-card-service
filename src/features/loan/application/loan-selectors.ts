import { RootState } from 'store';

export const selectStages = (state: RootState) => state.loan.stages;
export const selectStage = (state: RootState) => state.loan.stages.stage;
export const selectOffers = (state: RootState) => state.loan.stages.offers;
export const selectLoading = (state: RootState) => state.loan.loading;
export const selectFormRange = (state: RootState) => state.loan.stages.range;
export const selectFormError = (state: RootState) => state.loan.error;

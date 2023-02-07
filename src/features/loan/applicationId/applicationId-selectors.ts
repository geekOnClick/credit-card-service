import { RootState } from 'store';

// export const selectStages = (state: RootState) => state.applicationId.stages;
export const selectStageData = (state: RootState) => state.applicationId.stages.stageData;
export const selectScheduleData = (state: RootState) => state.applicationId.stages.scheduleData;
export const selectScheduleChecked = (state: RootState) => state.applicationId.stages.scheduleChecked;
export const selectDocumentChecked = (state: RootState) => state.applicationId.stages.documentChecked;
export const selectSesCode = (state: RootState) => state.applicationId.stages.sesCode;
export const selectStageDone = (state: RootState) => state.applicationId.stages.stageDone;
export const selectLoading = (state: RootState) => state.applicationId.loading;
export const selectError = (state: RootState) => state.applicationId.error;

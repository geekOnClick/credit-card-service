import { RootState } from 'store';

export const selectRangeValue = (state: RootState) => state.range.amount;

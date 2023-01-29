import { RootState } from 'store';

export const selectPairs = (state: RootState) => state.exchange.pairs;
export const selectCourses = (state: RootState) => state.exchange.list;

export const selectExchangeInfo = (state: RootState) => ({
    status: state.exchange.status,
    error: state.exchange.error,
    qty: state.exchange.list.length,
});

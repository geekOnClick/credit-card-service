import { RootState } from 'store';

export const selectNews = (state: RootState) => state.news.list;

export const selectNewsInfo = (state: RootState) => ({
    status: state.news.status,
    error: state.news.error,
    qty: state.news.list.length,
});

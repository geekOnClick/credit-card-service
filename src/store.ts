import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import * as api from '_config';
import { exchangeReducer } from 'features/home/exchange/exchange-slice';
import { newsReducer } from 'features/home/news/news-slice';
import { rangeReducer } from 'features/loan/range/range-slice';
import { formReducer } from 'features/loan/form/form-slice';
// import * as conf from 'config'

export const store = configureStore({
    reducer: {
        exchange: exchangeReducer,
        news: newsReducer,
        range: rangeReducer,
        form: formReducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: {
                    client: axios,
                    api,
                },
            },
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

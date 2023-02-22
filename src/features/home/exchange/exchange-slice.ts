import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IPair } from 'types/home';
import { Extra } from 'types/extra';
import { Status } from 'types/status';
import { ACTUAL_COURSES_HEADERS } from '_config';

// 1: Returns updated IPair[], 2: enter params (IPair[]), 3: additional params
export const loadCourses = createAsyncThunk<
    IPair[],
    IPair[],
    {
        state: { exchange: IExchangeSlice };
        extra: Extra;
        rejectValue: string | null;
    }
>(
    '@@exchange/load-courses',
    async (pairs, { extra: { client, api }, rejectWithValue }) => {
        try {
            const data = await Promise.all(
                pairs.map(async (pair: IPair) => {
                    const { data } = await client.get(api.ACTUAL_COURSES(pair), {
                        headers: ACTUAL_COURSES_HEADERS,
                    });
                    const updatedPair = JSON.parse(JSON.stringify(pair));
                    updatedPair.course = data.toFixed(2);
                    return updatedPair;
                })
            );

            return data;
        } catch (error) {
            if (error instanceof Error) return rejectWithValue(error.message);
            return rejectWithValue('Unknown error');
        }
    },
    {
        condition: (_, { getState }) => {
            const {
                exchange: { status },
            } = getState();

            if (status === 'loading') {
                return false;
            }
        },
    }
);

export interface IExchangeSlice {
    status: Status;
    error: string | null;
    pairs: IPair[];
    list: IPair[];
}

const initialState: IExchangeSlice = {
    status: 'idle',
    error: null,
    pairs: [
        { from: 'USD', to: 'RUB' },
        { from: 'EUR', to: 'RUB' },
        { from: 'JPY', to: 'RUB' },
        { from: 'GBP', to: 'RUB' },
        { from: 'CNH', to: 'RUB' },
        { from: 'DKK', to: 'RUB' },
    ],
    list: [],
};

const exchangeSlice = createSlice({
    name: '@@exchange',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadCourses.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loadCourses.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload || 'Cannot load data';
            })
            .addCase(loadCourses.fulfilled, (state, action) => {
                state.status = 'received';
                state.list = action.payload;
            });
    },
});

export const exchangeReducer = exchangeSlice.reducer;

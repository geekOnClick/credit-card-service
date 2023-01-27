import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { INews } from 'types/home';
import { Extra } from 'types/extra';
import { Status } from 'types/status';

// 1: Returns updated IPair[], 2: no enter params, 3: additional params
export const loadNews = createAsyncThunk<
    INews[],
    undefined,
    {
        state: { news: INewsSlice };
        extra: Extra;
        rejectValue: string | null;
    }
>(
    '@@news/load-news',
    async (_, { extra: { client, api }, rejectWithValue }) => {
        try {
            // const data = await client.get(api.ACTUAL_NEWS)
            const { data } = await client.get(api.ACTUAL_NEWS);
            // filter images and description
            const filteredData = data.articles.map(async (el: INews) => {
                const article = JSON.parse(JSON.stringify(el));
                if (!article.description)
                    article.description =
                        'Read this article by clicking here...';
                if (article.description.includes('<a href=')) {
                    if (article.content) article.description = article.content;
                }

                if (!article.urlToImage)
                    article.urlToImage = 'assets/img/errImg.jpg';
                return new Promise(function (resolve) {
                    const img = new Image();
                    img.onerror = img.onabort = function () {
                        article.urlToImage = null;
                        resolve(article);
                    };
                    img.onload = function () {
                        resolve(article);
                    };
                    img.src = article.urlToImage;
                });
            });
            // console.log('filteredData', filteredData);
            return await Promise.all(filteredData).then((res) => {
                return res;
            });

            // return data.articles;
        } catch (error) {
            if (error instanceof Error) return rejectWithValue(error.message);
            return rejectWithValue('Unknown error');
        }
    },
    {
        condition: (_, { getState }) => {
            const {
                news: { status },
            } = getState();

            if (status === 'loading') {
                return false;
            }
        },
    }
);

interface INewsSlice {
    status: Status;
    error: string | null;
    list: INews[];
}

const initialState: INewsSlice = {
    status: 'idle',
    error: null,
    list: [],
};

const newsSlice = createSlice({
    name: '@@news',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadNews.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loadNews.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload || 'Cannot load data';
            })
            .addCase(loadNews.fulfilled, (state, action) => {
                state.status = 'received';
                state.list = action.payload;
            });
    },
});

export const newsReducer = newsSlice.reducer;

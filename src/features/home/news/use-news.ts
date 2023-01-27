import { RootState, useAppDispatch } from 'store';
import { selectNews, selectNewsInfo } from './news-selectors';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadNews } from './news-slice';
import { INews } from 'types/home';

export const useNews = (): [INews[], ReturnType<typeof selectNewsInfo>] => {
    const dispatch = useAppDispatch();
    const news = useSelector((state: RootState) => selectNews(state));
    const { status, error, qty } = useSelector(selectNewsInfo);

    useEffect(() => {
        if (!qty) {
            dispatch(loadNews());
        }
    }, [qty, dispatch]);

    return [news, { status, error, qty }];
};

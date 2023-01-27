import { RootState, useAppDispatch } from 'store';
import { IPair } from 'types/home';
import {
    selectPairs,
    selectCourses,
    selectExchangeInfo,
} from './exchange-selectors';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadCourses } from './exchange-slice';

export const useExchange = (): [
    IPair[],
    ReturnType<typeof selectExchangeInfo>
] => {
    const dispatch = useAppDispatch();
    const pairs = useSelector((state: RootState) => selectPairs(state));
    const courses = useSelector((state: RootState) => selectCourses(state));
    const { status, error, qty } = useSelector(selectExchangeInfo);

    useEffect(() => {
        if (!qty) {
            dispatch(loadCourses(pairs));
            setInterval(() => {
                dispatch(loadCourses(pairs));
            }, 900000);
        }
    }, [qty, dispatch, pairs]);

    return [courses, { status, error, qty }];
};

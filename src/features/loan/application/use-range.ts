import { RootState, useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { changeRangeValue } from './loan-slice';
import { selectFormRange } from './loan-selectors';
export const useRange = (): [
    string,
    (e: React.ChangeEvent<HTMLInputElement>) => void
] => {
    const dispatch = useAppDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeRangeValue(e.target.value));
    };
    const range = useSelector((state: RootState) => selectFormRange(state));
    const updatedRange = String(range).replace(
        /(\d)(?=(\d{3})+([^\d]|$))/g,
        '$1 '
    );
    return [updatedRange, handleChange];
};

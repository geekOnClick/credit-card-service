import { RootState, useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { changeValue } from 'features/loan/range/range-slice';
import { selectRangeValue } from 'features/loan/range/range-selectors';
export const useRange = (): [
    string,
    (e: React.ChangeEvent<HTMLInputElement>) => void
] => {
    const dispatch = useAppDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeValue(e.target.value));
    };
    const range = useSelector((state: RootState) => selectRangeValue(state));
    const updatedRange = String(range).replace(
        /(\d)(?=(\d{3})+([^\d]|$))/g,
        '$1 '
    );
    return [updatedRange, handleChange];
};

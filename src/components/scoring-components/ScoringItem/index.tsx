import { IScoringItem } from 'types/applicationId';
import { ScoringInput } from '../ScoringInput';
import { ScoringLabel } from '../ScoringLabel';
import { ScoringSelect } from '../ScoringSelect';
import { useFormikContext } from 'formik';
import { useAppDispatch } from 'store';
import { changeStepData } from 'features/loan/applicationId/applicationId-slice';

import { useEffect } from 'react';

const ScoringItem: React.FC<IScoringItem> = (props: IScoringItem) => {
    const { title, inputPlaceholder, id, required, error, touched, options, validateFunc } = props;
    const { values } = useFormikContext();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (touched && !error) {
            dispatch(changeStepData(values));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [touched]);
    return (
        <div className='continuation-form__wrapper-input'>
            <ScoringLabel id={id} title={title} required={required} />
            {inputPlaceholder && (
                <div className='input__wrapper'>
                    {validateFunc && (
                        <ScoringInput
                            placeholder={inputPlaceholder}
                            id={id}
                            error={error}
                            touched={touched}
                            validateFunc={validateFunc}
                        />
                    )}
                    {!validateFunc && <ScoringInput placeholder={inputPlaceholder} id={id} error={error} touched={touched} />}
                </div>
            )}
            {!inputPlaceholder && options && (
                <ScoringSelect id={id} error={error} touched={touched} options={options} validateFunc={validateFunc} />
            )}
        </div>
    );
};
export { ScoringItem };

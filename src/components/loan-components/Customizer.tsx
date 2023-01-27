import { LoanForm } from './LoanForm';
import { Devider } from 'components/common/Devider';
import { Range } from '../../features/loan/range/Range';
import { useRange } from 'features/loan/range/use-range';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import {
    selectFormLoading,
    selectFormError,
} from 'features/loan/form/form-selectors';
import { Loader } from 'components/common/Loader';

const Customizer = () => {
    const [updatedRange] = useRange();
    const loading = useSelector((state: RootState) => selectFormLoading(state));
    const error = useSelector((state: RootState) => selectFormError(state));

    return (
        <section className='customize customize__spacer'>
            <div className='customize__wrapper'>
                <div className='customize__inner container'>
                    <div className='customize__left-block'>
                        <div className='customize__heading'>
                            <h2 className='customize__title'>
                                Customize your card
                            </h2>
                            <span className='customize__right-text'>
                                Step 1 of 5
                            </span>
                        </div>
                        <Range />
                    </div>
                    <Devider additional_class='customize__border-dashed' />
                    <div className='customize__right-block'>
                        <div className='customize__right-heading'>
                            <h3 className='customize__information-heading customize__information-heading_right'>
                                You have chosen the amount
                            </h3>
                            <span className='customize__left-text'>
                                {updatedRange} ₽
                            </span>
                        </div>
                        <Devider additional_class='customize__border' />
                    </div>
                </div>
                <div className='customize__information-content'>
                    <h3 className='customize__information-heading'>
                        Contact Information
                    </h3>
                    {loading && (
                        <div className='customize__loader-center'>
                            <Loader />
                        </div>
                    )}
                    {!loading && <LoanForm />}
                    {error && (
                        <h4 className='subscribe__error'>
                            Error occured. Try again later.
                        </h4>
                    )}
                </div>
            </div>
        </section>
    );
};
export { Customizer };

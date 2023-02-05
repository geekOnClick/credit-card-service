import { Customizer } from './Customizer';
import { Offers } from './Offers';
import { Stepper } from './Stepper';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'store';
import { Loader } from 'components/common/Loader';
import { selectStage, selectLoading } from 'features/loan/application/loan-selectors';
import { changeLoanData } from 'features/loan/application/loan-slice';
import { IOffer } from 'types/loan';
import axios from 'axios';
import * as api from '_config';

const Wizard = () => {
    const stage = useSelector((state: RootState) => selectStage(state));
    const loading = useSelector((state: RootState) => selectLoading(state));
    const dispatch = useAppDispatch();
    const clearWizard = () => {
        localStorage.removeItem('applicationIdStageDone');
        localStorage.removeItem('stage');
        localStorage.removeItem('applicationIdStage');
        localStorage.removeItem('applicationId');

        dispatch(changeLoanData(0));
    };

    // check loan stage
    useEffect(() => {
        async function checkId(applicationId: number | string) {
            await axios
                .get(api.GET_CURRENT_APPLICATION(applicationId))
                .then(() => {
                    const idStage = localStorage.getItem('applicationIdStage');
                    if (!idStage) {
                        localStorage.setItem('applicationIdStage', '2');
                    }
                    dispatch(
                        changeLoanData({
                            stage: 2,
                            id: applicationId,
                        })
                    );
                })
                .catch(() => {
                    clearWizard();
                });
        }
        const lsStage = localStorage.getItem('stage');
        if (!lsStage) return;
        else if (lsStage === '2') {
            const offers: IOffer[] = JSON.parse(`${localStorage.getItem('offers')}`);
            dispatch(
                changeLoanData({
                    stage: 1,
                    data: offers,
                })
            );
        } else if (lsStage === '3') {
            const applicationId = localStorage.getItem('applicationId');
            if (applicationId) checkId(applicationId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <div className='wizard wizard_spacing d-flex flex-column justify-content-center'>
            <h4 id='apply-card' className='wizard__title'>
                <a href='#apply-card' aria-hidden='true'>
                    How to get a card
                </a>
            </h4>
            <Stepper />
            {loading && (
                <div className='customize__loader-center'>
                    <Loader />
                </div>
            )}
            {stage === 1 && !loading && <Customizer />}
            {stage === 2 && !loading && <Offers />}
            {stage === 3 && !loading && (
                <section className='msg'>
                    <div className='msg__title'>The preliminary decision has been sent to your email.</div>
                    <div className='msg__desc'>
                        In the letter you can get acquainted with the preliminary decision on the credit card.
                    </div>
                </section>
            )}
        </div>
    );
};
export { Wizard };

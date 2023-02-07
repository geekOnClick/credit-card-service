import { Header } from 'components/common/Header';
import { Footer } from 'components/common/Footer';
import { Button } from 'components/common/Button';
import { Main } from 'components/common/Main';
import { Modal } from 'components/common/Modal';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as api from '_config';
import { Table } from 'components/schedule-components/Table';
import { IScheduleItem } from 'types/loan';
import { Checkbox } from 'components/common/Checkbox';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'store';
import {
    changeStepDone,
    changeScheduleData,
    changescheduleChecked,
    changeLoading,
    changeError,
} from 'features/loan/applicationId/applicationId-slice';
import {
    selectScheduleData,
    selectStageDone,
    selectScheduleChecked,
    selectLoading,
    selectError,
} from 'features/loan/applicationId/applicationId-selectors';
import { ScheduleSent } from 'components/schedule-components/ScheduleSent';
import { Loader } from 'components/common/Loader';

const PaymentSchedule = () => {
    const navigate = useNavigate();
    const applicationId = localStorage.getItem('applicationId');
    const stageDone = useSelector((state: RootState) => selectStageDone(state));
    const scheduleDataStore = useSelector((state: RootState) => selectScheduleData(state));
    const scheduleChecked = useSelector((state: RootState) => selectScheduleChecked(state));
    const loading = useSelector((state: RootState) => selectLoading(state));
    const error = useSelector((state: RootState) => selectError(state));
    const [scheduleData, setScheduleData] = useState<IScheduleItem[] | []>(scheduleDataStore);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useAppDispatch();

    //callback close modal
    const closeModal = (e: Event) => {
        e.preventDefault();
        setShowModal(false);
    };

    // Check Schedule stage
    useEffect(() => {
        const stageDoneLs = localStorage.getItem('applicationIdStageDone') === 'true';
        if (stageDoneLs !== stageDone) {
            dispatch(changeStepDone(stageDoneLs));
        }
    }, [dispatch, stageDone]);

    // Get Shedule data
    useEffect(() => {
        async function getSheduleData(id: number | string) {
            dispatch(changeError(false));
            dispatch(changeLoading(true));
            await axios
                .get(api.GET_CURRENT_APPLICATION(id))
                .then(
                    ({
                        data: {
                            credit: { paymentSchedule },
                        },
                    }) => {
                        dispatch(changeLoading(false));
                        dispatch(changeScheduleData(paymentSchedule));
                        setScheduleData(paymentSchedule);
                    }
                )
                .catch(() => {
                    dispatch(changeError(true));
                    return navigate('/*');
                });
        }
        if (applicationId && scheduleDataStore.length === 0) getSheduleData(applicationId);
    }, [dispatch, scheduleDataStore.length, applicationId, navigate]);

    // callback on click accept button
    const acceptShedule = async (e: Event) => {
        e.preventDefault();
        dispatch(changeError(false));
        dispatch(changeLoading(true));
        if (applicationId)
            await axios
                .post(api.ACCEPT_SCHEDULE(Number(applicationId)))
                .then(() => {
                    dispatch(changeLoading(false));
                    dispatch(changeScheduleData([]));
                    dispatch(changescheduleChecked(false));
                    dispatch(
                        changeStepDone({
                            stageDone: true,
                        })
                    );
                    localStorage.setItem('applicationIdStageDone', 'true');
                })
                .catch((err) => {
                    console.log(err);
                    dispatch(changeLoading(false));
                    dispatch(changeError(true));
                });
    };

    return (
        <>
            <Header />
            <Main>
                <>
                    {!stageDone && (
                        <section className='schedule schedule__spacer container'>
                            <div className='schedule__wrapper'>
                                <div className='schedule__inner'>
                                    <div className='schedule__left-block'>
                                        <div className='schedule__heading'>
                                            <h2 className='schedule__title'>Payment Schedule</h2>
                                            <span className='schedule__right-text'>Step 3 of 5</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='schedule__information-content'>
                                    <form className='form registration__form' action='#'>
                                        {loading && (
                                            <div className='loader-wrapper'>
                                                <Loader />
                                            </div>
                                        )}
                                        {!loading && <Table data={scheduleData} />}
                                        <div className='paymentShedule__btns'>
                                            <Button
                                                title={'Deny'}
                                                type='button'
                                                additional_class={'form__btn'}
                                                callback={() => setShowModal(true)}
                                            />
                                            <div className='paymentShedule__btn-wrapper'>
                                                <Checkbox
                                                    checked={scheduleChecked}
                                                    name={'Agree'}
                                                    callback={() => dispatch(changescheduleChecked(!scheduleChecked))}
                                                />

                                                <span>I agree with the payment schedule</span>
                                                <Button
                                                    disabled={!scheduleChecked}
                                                    title={'Send'}
                                                    type='button'
                                                    additional_class={'paymentShedule__btn'}
                                                    callback={(e: MouseEvent) => acceptShedule(e)}
                                                />
                                            </div>
                                        </div>
                                        {showModal && (
                                            <Modal
                                                title='Deny application'
                                                text='You exactly sure, you want to cancel this application?'
                                                closeModal={closeModal}
                                            />
                                        )}
                                    </form>
                                </div>
                            </div>
                            {error && <h4 className='list-error'>Error occured. Try again later.</h4>}
                        </section>
                    )}
                    {stageDone && <ScheduleSent />}
                </>
            </Main>
            <Footer />
        </>
    );
};

export { PaymentSchedule };

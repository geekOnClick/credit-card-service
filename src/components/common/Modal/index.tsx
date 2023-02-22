/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button } from 'components/common/Button';
import React, { useState } from 'react';
import { IModal } from 'types/applicationId';
import axios from 'axios';
import * as api from '_config';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store';
import {
    changeStepDone,
    changeStepData,
    changeScheduleData,
    changescheduleChecked,
} from 'features/loan/applicationId/applicationId-slice';
import { changeLoanData } from 'features/loan/application/loan-slice';

const Modal: React.FC<IModal> = (props: IModal) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { title, text, closeModal } = props;
    const [isDenyed, setIsDenyed] = useState(false);
    const [isErrorDenyed, setIsErrorDenyed] = useState(false);
    const denyApplication = async (e: Event) => {
        e.preventDefault();
        setIsErrorDenyed(false);
        const id = localStorage.getItem('applicationId');
        if (id)
            await axios
                .post(api.DENY_APP(id))
                .then(() => {
                    localStorage.removeItem('applicationIdStageDone');
                    localStorage.removeItem('stage');
                    localStorage.removeItem('applicationIdStage');
                    localStorage.removeItem('applicationId');

                    dispatch(changeStepDone(false));
                    dispatch(changeStepData(null));
                    dispatch(changeScheduleData([]));
                    dispatch(changescheduleChecked(false));
                    dispatch(changeLoanData({ stage: 0 }));

                    setIsDenyed(true);
                })
                .catch(() => {
                    setIsErrorDenyed(true);
                });
    };
    return (
        <div data-testid='modal' className='modal'>
            <div className='modal__overlay' onClick={(e) => (isDenyed ? navigate(`/`) : closeModal(e))}>
                <div className='modal__content' onClick={(e) => e.stopPropagation()}>
                    <div className='modal__header'>
                        <h2 className='modal__title'>{title}</h2>
                        <button className='modal__close' onClick={(e) => (isDenyed ? navigate(`/`) : closeModal(e))}>
                            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path
                                    d='M18 6L6 18'
                                    stroke='#33363F'
                                    strokeWidth='2'
                                    strokeLinecap='square'
                                    strokeLinejoin='round'
                                />
                                <path
                                    d='M6 6L18 18'
                                    stroke='#33363F'
                                    strokeWidth='2'
                                    strokeLinecap='square'
                                    strokeLinejoin='round'
                                />
                            </svg>
                        </button>
                    </div>
                    <div className='modal__body'>
                        {!isDenyed && <p className='modal__desc'>{text}</p>}
                        {isDenyed && <p className='modal__desc'>Your application has been denyed!</p>}
                        {isErrorDenyed && <p className='modal__desc'>Error while denying application. Please repeat later.</p>}
                    </div>
                    <div className='modal__footer'>
                        <div className='modal__btns'>
                            {!isDenyed && (
                                <Button
                                    title='Deny'
                                    data-testid='deny-btn'
                                    type='button'
                                    additional_class='modal__btn-deny'
                                    callback={(e: MouseEvent) => denyApplication(e)}
                                />
                            )}
                            <div className='.modal__btn-cancel'>
                                {!isDenyed && (
                                    <Button
                                        title='Cancel'
                                        additional_class='paymentShedule__btn'
                                        callback={(e: MouseEvent) => closeModal(e)}
                                    />
                                )}
                                {isDenyed && (
                                    <Button
                                        title='Go home'
                                        additional_class='paymentShedule__btn'
                                        callback={() => navigate('/')}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export { Modal };

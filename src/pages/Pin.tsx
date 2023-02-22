import { Header } from 'components/common/Header';
import { Footer } from 'components/common/Footer';
import { Main } from 'components/common/Main';
import { IPin } from 'types/applicationId';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'store';
import { changeStepDone, changeLoading, changeError, changeSesCode } from 'features/loan/applicationId/applicationId-slice';
import { useNavigate } from 'react-router-dom';
import { selectStageDone, selectSesCode, selectLoading, selectError } from 'features/loan/applicationId/applicationId-selectors';
import axios from 'axios';
import * as api from '_config';
import { PinSent } from 'components/pin-components/PinSent';
import { Loader } from 'components/common/Loader';

const Pin = () => {
    const applicationId = localStorage.getItem('applicationId');
    const stageDone = useSelector((state: RootState) => selectStageDone(state));
    const sesCode = useSelector((state: RootState) => selectSesCode(state));
    const loading = useSelector((state: RootState) => selectLoading(state));
    const error = useSelector((state: RootState) => selectError(state));
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const initialValues: IPin = {
        first: '',
        second: '',
        third: '',
        fourth: '',
    };
    const [errorSubmit, setErrorSubmit] = useState(false);
    const [submitValues, setSubmitValues] = useState(initialValues);
    // const submitValues = useRef(initialValues);

    // Check PIN stage
    useEffect(() => {
        const stageDoneLs = localStorage.getItem('applicationIdStageDone') === 'true';
        if (stageDoneLs !== stageDone) {
            dispatch(changeStepDone(stageDoneLs));
        }
    }, [dispatch, stageDone]);

    useEffect(() => {
        handleSubmit();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submitValues]);

    // Get SesCode
    useEffect(() => {
        dispatch(changeError(false));
        dispatch(changeLoading(true));
        async function getSesCode(id: number | string) {
            await axios
                .get(api.GET_CURRENT_APPLICATION(id))
                .then(({ data: { sesCode } }) => {
                    // adding console.log to be able to see sesCode
                    console.log('sesCode:', sesCode);
                    dispatch(changeLoading(false));
                    dispatch(changeSesCode(sesCode));
                })
                .catch(() => {
                    dispatch(changeError(true));
                    return navigate('/*');
                });
        }
        if (applicationId) getSesCode(applicationId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = async () => {
        let userValues = '';
        const object = submitValues;
        let property: keyof typeof object;
        for (property in object) {
            if (!object[property]) return;
            userValues += `${object[property]}`;
        }

        if (sesCode !== userValues) {
            setErrorSubmit(true);
        } else {
            setErrorSubmit(false);
            dispatch(changeError(false));
            dispatch(changeLoading(true));

            if (applicationId)
                await axios({
                    method: 'post',
                    url: api.SEND_CODE(applicationId),
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    data: Number(userValues),
                })
                    .then(() => {
                        dispatch(changeLoading(false));
                        dispatch(changeSesCode(''));
                        dispatch(
                            changeStepDone({
                                stageDone: true,
                            })
                        );
                        localStorage.setItem('applicationIdStageDone', 'true');
                    })
                    .catch(() => {
                        dispatch(changeLoading(false));
                        dispatch(changeError(true));
                    });
        }
    };

    const focusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 0) {
            const nextInput = e.target.parentElement?.nextElementSibling?.firstChild as HTMLInputElement;

            if (nextInput) {
                nextInput.focus();
            }
        } else {
            const prevInput = e.target.parentElement?.previousElementSibling?.firstChild as HTMLInputElement;

            if (prevInput) {
                prevInput.focus();
            }
        }
    };

    return (
        <>
            <Header />
            <Main>
                <>
                    {!stageDone && (
                        <>
                            {loading && (
                                <div className='loader-wrapper loader__pin'>
                                    <Loader />
                                </div>
                            )}
                            {!loading && (
                                <div className='confirm'>
                                    <div className='confirm__content container'>
                                        <h1 className='confirm__title'>Please enter confirmation code</h1>
                                        <div className='confirm__code-items'>
                                            <div
                                                className={`confirm__code-item ${
                                                    submitValues.first ? 'confirm__code-item--active' : ''
                                                }`}
                                            >
                                                <input
                                                    id={'first'}
                                                    className={`${
                                                        !(submitValues.first.length > 0)
                                                            ? 'confirm__code-circle'
                                                            : 'code-item__active'
                                                    }`}
                                                    type='text'
                                                    maxLength={1}
                                                    required={true}
                                                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                        focusChange(e);
                                                        setSubmitValues({
                                                            ...submitValues,
                                                            first: e.target.value,
                                                        });
                                                    }}
                                                />
                                            </div>
                                            <div
                                                className={`confirm__code-item ${
                                                    Number(submitValues.second.length) > 0 ? 'confirm__code-item--active' : ''
                                                }`}
                                            >
                                                <input
                                                    id={'second'}
                                                    className={`${
                                                        !(submitValues.second.length > 0)
                                                            ? 'confirm__code-circle'
                                                            : 'code-item__active'
                                                    }`}
                                                    type='text'
                                                    maxLength={1}
                                                    required={true}
                                                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                        focusChange(e);
                                                        setSubmitValues({
                                                            ...submitValues,
                                                            second: e.target.value,
                                                        });
                                                    }}
                                                />
                                            </div>
                                            <div
                                                className={`confirm__code-item ${
                                                    Number(submitValues.third.length) > 0 ? 'confirm__code-item--active' : ''
                                                }`}
                                            >
                                                <input
                                                    id={'third'}
                                                    className={`${
                                                        !(submitValues.third.length > 0)
                                                            ? 'confirm__code-circle'
                                                            : 'code-item__active'
                                                    }`}
                                                    type='text'
                                                    maxLength={1}
                                                    required={true}
                                                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                        focusChange(e);
                                                        setSubmitValues({
                                                            ...submitValues,
                                                            third: e.target.value,
                                                        });
                                                    }}
                                                />
                                            </div>
                                            <div
                                                className={`confirm__code-item ${
                                                    Number(submitValues.fourth.length) > 0 ? 'confirm__code-item--active' : ''
                                                }`}
                                            >
                                                <input
                                                    id={'fourth'}
                                                    className={`${
                                                        !(submitValues.fourth.length > 0)
                                                            ? 'confirm__code-circle'
                                                            : 'code-item__active'
                                                    }`}
                                                    type='text'
                                                    maxLength={1}
                                                    required={true}
                                                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                        focusChange(e);
                                                        setSubmitValues({
                                                            ...submitValues,
                                                            fourth: e.target.value,
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        {errorSubmit && <div className='confirm__code-error'>Invalid confirmation code</div>}
                                        {error && <h4 className='list-error'>Error occured. Try again later.</h4>}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                    {stageDone && <PinSent />}
                </>
            </Main>
            <Footer />
        </>
    );
};

export { Pin };

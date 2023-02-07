import { Header } from 'components/common/Header';
import { Footer } from 'components/common/Footer';
// import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Main } from 'components/common/Main';
import { Button } from 'components/common/Button';
import { Checkbox } from 'components/common/Checkbox';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'store';
import {
    selectDocumentChecked,
    selectStageDone,
    selectLoading,
    selectError,
} from 'features/loan/applicationId/applicationId-selectors';
import {
    changeStepDone,
    changedocumentChecked,
    changeLoading,
    changeError,
} from 'features/loan/applicationId/applicationId-slice';
import axios from 'axios';
import * as api from '_config';
import Pdf from '../assets/data/credit-card-offer.pdf';
import { DocumentSent } from 'components/document-components/DocumentSent';
import { Loader } from 'components/common/Loader';

const Document = () => {
    const dispatch = useAppDispatch();
    const applicationId = localStorage.getItem('applicationId');
    const stageDone = useSelector((state: RootState) => selectStageDone(state));
    const documentChecked = useSelector((state: RootState) => selectDocumentChecked(state));
    const loading = useSelector((state: RootState) => selectLoading(state));
    const error = useSelector((state: RootState) => selectError(state));
    // Check Schedule stage
    useEffect(() => {
        const stageDoneLs = localStorage.getItem('applicationIdStageDone') === 'true';
        if (stageDoneLs !== stageDone) {
            dispatch(changeStepDone(stageDoneLs));
        }
    }, [dispatch, stageDone]);

    // callback on click download icon
    const onButtonClick = () => {
        fetch(Pdf).then((response) => {
            response.blob().then((blob) => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);
                // Setting various property values
                const alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = 'credit-card-offer.pdf';
                alink.click();
            });
        });
    };

    //callback on click accept button
    const acceptDocument = async (e: Event) => {
        e.preventDefault();
        if (applicationId) dispatch(changeError(false));
        dispatch(changeLoading(true));
        await axios
            .post(api.ACCEPT_DOCUMENT(Number(applicationId)))
            .then(() => {
                dispatch(changeLoading(false));
                dispatch(changedocumentChecked(false));
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
                        <section className='signing signing__spacing'>
                            <div className='signingDoc__block container'>
                                {loading && (
                                    <div className='loader-wrapper'>
                                        <Loader />
                                    </div>
                                )}
                                {!loading && (
                                    <div>
                                        <div className='signingDoc__heading'>
                                            <h2 className='signingDoc__title'>Payment Schedule</h2>
                                            <span className='signingDoc__right-text'>Step 3 of 5</span>
                                        </div>
                                        <p className='signingDoc__desc'>
                                            Information on interest rates under bank deposit agreements with individuals. Center
                                            for Corporate Information Disclosure. Information of a professional participant in the
                                            securities market. Information about persons under whose control or significant
                                            influence the Partner Banks are. By leaving an application, you agree to the
                                            processing of personal data, obtaining information, obtaining access to a credit
                                            history, using an analogue of a handwritten signature, an offer, a policy regarding
                                            the processing of personal data, a form of consent to the processing of personal data.
                                        </p>
                                        <div className='signingDoc__info'>
                                            <button className='signingDoc__info-left' onClick={onButtonClick}>
                                                <svg
                                                    width='60'
                                                    height='60'
                                                    viewBox='0 0 60 60'
                                                    fill='none'
                                                    xmlns='http://www.w3.org/2000/svg'
                                                >
                                                    <path
                                                        d='M12.5 9.5C12.5 8.39543 13.3954 7.5 14.5 7.5H29.75C29.8881 7.5 30 7.61193 30 7.75V23C30 24.1046 30.8954 25 32 25H47.25C47.3881 25 47.5 25.1119 47.5 25.25V50.5C47.5 51.6046 46.6046 52.5 45.5 52.5H14.5C13.3954 52.5 12.5 51.6046 12.5 50.5V9.5Z'
                                                        fill='#2A4157'
                                                        fillOpacity='0.24'
                                                    />
                                                    <path
                                                        d='M32.5 21.5V8.10355C32.5 7.88083 32.7693 7.76929 32.9268 7.92678L47.0732 22.0732C47.2307 22.2307 47.1192 22.5 46.8964 22.5H33.5C32.9477 22.5 32.5 22.0523 32.5 21.5Z'
                                                        fill='#222222'
                                                    />
                                                    <path d='M21.25 33.75L36.25 33.75' stroke='#222222' strokeLinecap='round' />
                                                    <path d='M21.25 41.25L33.75 41.25' stroke='#222222' strokeLinecap='round' />
                                                </svg>
                                            </button>
                                            <span className='signingDoc__info-desc'>Information on your card</span>
                                        </div>
                                        <form className='signingDoc__form'>
                                            <Checkbox
                                                checked={documentChecked}
                                                name={'Agree'}
                                                callback={() => dispatch(changedocumentChecked(!documentChecked))}
                                            />
                                            <span>I agree</span>
                                            <Button
                                                disabled={!documentChecked}
                                                title={'Send'}
                                                type='button'
                                                additional_class={'signingDoc__btn'}
                                                callback={(e: MouseEvent) => acceptDocument(e)}
                                            />
                                        </form>
                                    </div>
                                )}
                            </div>
                            {error && <h4 className='list-error'>Error occured. Try again later.</h4>}
                        </section>
                    )}
                    {stageDone && <DocumentSent />}
                </>
            </Main>
            <Footer />
        </>
    );
};

export { Document };

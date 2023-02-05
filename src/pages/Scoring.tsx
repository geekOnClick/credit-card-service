import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as api from '_config';
import { Header } from 'components/common/Header';
import { Footer } from 'components/common/Footer';
import { Main } from 'components/common/Main';
import { ScoringForm } from 'components/scoring-components/ScoringForm';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'store';
import { selectStageDone } from 'features/loan/applicationId/applicationId-selectors';
import { changeStepDone, changeLoading, changeError } from 'features/loan/applicationId/applicationId-slice';
import { ScoringSent } from 'components/scoring-components/ScoringSent';

const Scoring = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const [account, setAccount] = useState(null);
    const navigate = useNavigate();
    const stageDone = useSelector((state: RootState) => selectStageDone(state));

    // Check Schedule stage
    useEffect(() => {
        const stageDoneLs = localStorage.getItem('applicationIdStageDone') === 'true';
        if (stageDoneLs !== stageDone) {
            dispatch(changeStepDone(stageDoneLs));
        }
    }, [dispatch, stageDone]);

    // Check if application Id exists
    useEffect(() => {
        dispatch(changeError(false));
        dispatch(changeLoading(true));
        const localStorageId = localStorage.getItem('applicationId');
        async function checkId(id: number | string) {
            await axios
                .get(api.GET_CURRENT_APPLICATION(id))
                .then(({ data }) => {
                    dispatch(changeLoading(false));
                    const { client } = data;
                    setAccount(client.account);
                })
                .catch(() => {
                    return navigate('/*');
                });
        }
        if (id && localStorageId) checkId(id);
        else return navigate('/*');
    }, [id, navigate, dispatch]);

    return (
        <div className='wrapper h-100'>
            <Header />
            <Main>
                <>
                    {!stageDone && (
                        <section className='continuation continuation__spacing'>
                            <div className='continuation__wrapper'>
                                <div className='continuation__inner'>
                                    <div className='continuation__left-block'>
                                        <div className='continuation__heading'>
                                            <h2 className='continuation__title'>Continuation of the application</h2>
                                            <span className='continuation__right-text'>Step 2 of 5</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='continuation__information-content'>
                                    {id && <ScoringForm applicationId={id} account={account} />}
                                </div>
                            </div>
                        </section>
                    )}
                    {stageDone && <ScoringSent />}
                </>
            </Main>
            <Footer />
        </div>
    );
};
export { Scoring };

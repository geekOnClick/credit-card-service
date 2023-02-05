import { useEffect } from 'react';
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

const ScoringSent = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        async function checkStatus() {
            const id = localStorage.getItem('applicationId');
            if (id)
                await axios
                    .get(api.GET_CURRENT_APPLICATION(id))
                    .then(({ data }) => {
                        console.log(data);

                        const { status } = data;
                        if (status !== 'CC_DENIED') {
                            localStorage.setItem('applicationIdStage', '3');
                            dispatch(changeStepDone(false));
                            localStorage.setItem('applicationIdStageDone', 'false');

                            return navigate(`/loan/${id}/document`);
                        } else {
                            console.log('deny');

                            localStorage.removeItem('applicationIdStageDone');
                            localStorage.removeItem('stage');
                            localStorage.removeItem('applicationIdStage');
                            localStorage.removeItem('applicationId');

                            dispatch(changeStepDone(false));
                            dispatch(changeStepData(null));
                            dispatch(changeScheduleData([]));
                            dispatch(changescheduleChecked(false));
                            dispatch(changeLoanData({ stage: 0 }));

                            return navigate('/');
                        }
                    })
                    .catch(() => {
                        return navigate('/*');
                    });
        }
        setTimeout(() => {
            checkStatus();
        }, 10000);
    }, [dispatch, navigate]);
    return (
        <div className='decision__block'>
            <h2 className='decision__title'>Wait for a decision on the application</h2>
            <p className='decision__desc'>The answer will come to your mail within 10 minutes</p>
        </div>
    );
};
export { ScoringSent };

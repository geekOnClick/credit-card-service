import { Home } from 'pages/Home';
import { Loan } from 'pages/Loan';
import { Scoring } from 'pages/Scoring';
import { NotFound } from 'pages/NotFound';
import { Routes, Route } from 'react-router-dom';
import './assets/lib/bootstrap/css/bootstrap-reboot.css';
import './assets/lib/bootstrap/css/bootstrap.css';
import './assets/lib/material/css/materialdesignicons.css';
import './assets/styles/style.scss';
import { PaymentSchedule } from 'pages/PaymentSchedule';
import { Document } from 'pages/Document';
import { Pin } from 'pages/Pin';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import * as api from '_config';
import { useAppDispatch } from 'store';
import { changeLoanData } from 'features/loan/application/loan-slice';
import {
    changeStepData,
    changeScheduleData,
    changescheduleChecked,
    changedocumentChecked,
    changeSesCode,
    changeStepDone,
} from 'features/loan/applicationId/applicationId-slice';

const App = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const stage = Number(localStorage.getItem('applicationIdStage'));
    const applicationId = localStorage.getItem('applicationId');
    const isEditingApplication = /^http:\/\/localhost:3000\/loan\/[\s\S]*$/.test(location.href);

    const clearAllData = () => {
        localStorage.removeItem('applicationIdStageDone');
        localStorage.removeItem('stage');
        localStorage.removeItem('applicationIdStage');
        localStorage.removeItem('applicationId');
        dispatch(changeLoanData(0));
        dispatch(changeStepDone(false));
        dispatch(changeStepData(null));
        dispatch(changeScheduleData([]));
        dispatch(changescheduleChecked(false));
        dispatch(changedocumentChecked(false));
        dispatch(changeSesCode(''));
    };

    // check correct page navigation
    useEffect(() => {
        async function checkStage(id: number | string) {
            await axios
                .get(api.GET_CURRENT_APPLICATION(id))
                .then(({ data }) => {
                    if (stage === 3) {
                        if (!data.credit) return navigate('/*');
                    } else if (stage === 4) {
                        if (data.status !== 'DOCUMENT_CREATED') return navigate('/*');
                    } else if (stage === 5) {
                        if (!data.sesCode) return navigate('/*');
                    }
                })
                .catch(() => {
                    clearAllData();
                    return navigate('/');
                });
        }
        if (isEditingApplication && applicationId && stage) checkStage(applicationId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate, stage, applicationId, isEditingApplication]);

    window.onpopstate = () => {
        if (isEditingApplication) {
            navigate('/loan');
        }
    };
    return (
        <div className='wrapper h-100' data-testid='wrapper'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='loan'>
                    <Route index element={<Loan />} />
                    <Route path=':id'>
                        <Route index element={stage === 2 ? <Scoring /> : <NotFound />} />
                        <Route path='document'>
                            <Route index element={stage === 3 ? <PaymentSchedule /> : <NotFound />} />
                            <Route path='sign' element={stage === 4 ? <Document /> : <NotFound />} />
                        </Route>
                        <Route path='code' element={stage === 5 ? <Pin /> : <NotFound />} />
                    </Route>
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
        </div>
    );
};

export { App };

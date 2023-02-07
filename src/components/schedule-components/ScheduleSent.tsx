import { useEffect } from 'react';
import axios from 'axios';
import * as api from '_config';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { changeStepDone } from 'features/loan/applicationId/applicationId-slice';
const ScheduleSent = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        async function checkStatus() {
            const id = localStorage.getItem('applicationId');
            if (id)
                await axios
                    .get(api.GET_CURRENT_APPLICATION(id))
                    .then(() => {
                        localStorage.setItem('applicationIdStage', '4');
                        dispatch(changeStepDone(false));
                        localStorage.setItem('applicationIdStageDone', 'false');
                        return navigate(`/loan/${id}/document/sign`);
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
        <div className='doc_block'>
            <h2 className='doc__title'>Documents are formed</h2>
            <p className='doc__desc'>Documents for signing will be sent to your email</p>
        </div>
    );
};
export { ScheduleSent };

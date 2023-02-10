import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { selectStage } from 'features/loan/application/loan-selectors';

export const useButton = (): {
    title: string;
    callback: () => void;
} => {
    const stage = useSelector((state: RootState) => selectStage(state));
    const navigate = useNavigate();
    const applicationId = localStorage.getItem('applicationId');
    const stageAppId = Number(localStorage.getItem('applicationIdStage'));

    const applyForCard = () => {
        window.location.href = '#apply-card';
    };
    const continueRegistration = () => {
        if (applicationId && stageAppId === 2) return navigate(`/loan/${applicationId}`);
        else if (applicationId && stageAppId === 3) return navigate(`/loan/${applicationId}/document`);
        else if (applicationId && stageAppId === 4) return navigate(`/loan/${applicationId}/document/sign`);
        else if (applicationId && stageAppId === 5) return navigate(`/loan/${applicationId}/code`);
    };
    const [title, setTitle] = useState('');
    const [callback, setCallback] = useState(() => applyForCard);

    useEffect(() => {
        switch (stage) {
            case 1:
                setTitle('Apply for card');
                break;
            case 2:
                setTitle('Choose an offer');
                break;
            case 3:
                setTitle('Continue registration');
                setCallback(() => continueRegistration);
                break;
            default:
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stage]);

    return { title, callback };
};

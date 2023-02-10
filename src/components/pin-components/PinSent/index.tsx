import { useNavigate } from 'react-router-dom';
import img from '../../../assets/img/SurpriseImage.png';
import { useAppDispatch } from 'store';
import { changeStepDone } from 'features/loan/applicationId/applicationId-slice';
import { changeLoanData } from 'features/loan/application/loan-slice';

const PinSent = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const endApplication = () => {
        localStorage.removeItem('applicationIdStageDone');
        localStorage.removeItem('stage');
        localStorage.removeItem('applicationIdStage');
        localStorage.removeItem('applicationId');
        dispatch(changeLoanData({ stage: 0 }));
        dispatch(changeStepDone(false));

        return navigate('/');
    };
    return (
        <>
            <div className='congratulations'>
                <div className='congratulations__content container'>
                    <img src={img} alt='Surprize' className='congratulations__img' />
                    <h1 className='congratulations__title'>Congratulations! You have completed your new credit card.</h1>
                    <p className='congratulations__desc'>Your credit card will arrive soon. Thank you for choosing us!</p>
                    <button className='congratulations__btn' onClick={endApplication}>
                        View other offers of our bank
                    </button>
                </div>
            </div>
        </>
    );
};
export { PinSent };

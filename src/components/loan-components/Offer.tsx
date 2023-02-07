import { IOffer } from 'types/loan';
import offer_img from '../../assets/img/offer.svg';
import err_icon from '../../assets/img/err_icon.svg';
import ok_icon from '../../assets/img/ok_icon.svg';
import axios from 'axios';
import * as api from '_config';
import { Button } from 'components/common/Button';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'store';
import { selectOffers } from 'features/loan/application/loan-selectors';
import { changeLoanData, changeLoading, changeError } from 'features/loan/application/loan-slice';

const Offer = (props: IOffer) => {
    const { applicationId, requestedAmount, totalAmount, term, monthlyPayment, rate, isInsuranceEnabled, isSalaryClient } = props;
    const offers: IOffer[] = useSelector((state: RootState) => selectOffers(state));
    const dispatch = useAppDispatch();

    const handleClick = async () => {
        const data = offers.find((offer) => offer.applicationId === applicationId);
        dispatch(changeError(false));
        dispatch(changeLoading(true));
        await axios
            .post(api.SELECT_OFFER, data)
            .then(() => {
                dispatch(changeLoading(false));
                dispatch(
                    changeLoanData({
                        stage: 2,
                        id: applicationId,
                    })
                );
                localStorage.setItem('stage', '3');
                localStorage.removeItem('offers');
                localStorage.setItem('applicationId', `${applicationId}`);
                localStorage.setItem('applicationIdStage', `2`);
            })
            .catch((err) => {
                console.log(err);
                dispatch(changeLoading(false));
                dispatch(changeError(true));
            });
    };
    return (
        <div className='giftbox__item'>
            <img className='giftbox_img' src={offer_img} alt='offer' />
            <ul className='giftbox__list'>
                <li className='giftbox__list-item'>Requested amount: {requestedAmount}</li>
                <li className='giftbox__list-item'>Total amount: {totalAmount}</li>
                <li className='giftbox__list-item'>For {term} month </li>
                <li className='giftbox__list-item'>Monthly payment: {monthlyPayment}</li>
                <li className='giftbox__list-item'>Your rate: {rate}%</li>
                <li className='giftbox__list-item'>
                    Insurance included{' '}
                    <img
                        className='icon_offer'
                        src={`${isInsuranceEnabled ? ok_icon : err_icon}`}
                        alt={`${isInsuranceEnabled}`}
                    />
                </li>
                <li className='giftbox__list-item'>
                    Salary client{' '}
                    <img className='icon_offer' src={`${isSalaryClient ? ok_icon : err_icon}`} alt={`${isSalaryClient}`} />
                </li>
                <Button title='Select' additional_class='giftbox__btn' callback={handleClick} />
            </ul>
        </div>
    );
};
export { Offer };

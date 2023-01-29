import { Button } from 'components/common/Button';
import { Tooltip } from '../common/Tooltip';

const CardAds = () => {
    return (
        <div className='cardAds cardAds_spacing d-block d-lg-flex justify-content-lg-between'>
            <div className='cardAds__wrapper'>
                <div className='cardAds__info'>
                    <h2 className='cardAds__title'>
                        Platinum digital credit card
                    </h2>
                    <p className='cardAds__description'>
                        Our best credit card. Suitable for everyday spending and
                        shopping. Cash withdrawals and transfers without
                        commission and interest.
                    </p>
                    <div className='payment-info d-flex justify-content-between'>
                        <Tooltip text='When repaying the full debt up to 160 days.'>
                            <div className='payment-info__details'>
                                <p className='payment-info__details_bold'>
                                    Up to 160 days
                                </p>
                                <p>No percent</p>
                            </div>
                        </Tooltip>
                        <Tooltip text='Over the limit willaccrue percent'>
                            <div className='payment-info__details'>
                                <p className='payment-info__details_bold'>
                                    Up to 600 000 ₽
                                </p>
                                <p>Credit limit</p>
                            </div>
                        </Tooltip>
                        <Tooltip text='Promotion valid until December 31, 2022.'>
                            <div className='payment-info__details'>
                                <p className='payment-info__details_bold'>
                                    0 ₽
                                </p>
                                <p>Card service is free</p>
                            </div>
                        </Tooltip>
                    </div>
                    <div className='btn-wrapper'>
                        <Button
                            title='Apply for card'
                            additional_class='cardAds__btn'
                            callback={() => {
                                window.location.href = '#apply-card';
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export { CardAds };

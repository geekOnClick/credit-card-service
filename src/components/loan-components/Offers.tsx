import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { selectOffers } from 'features/loan/application/loan-selectors';
import { Offer } from './Offer';
import { IOffer } from 'types/loan';
const Offers = () => {
    const offers: IOffer[] = useSelector((state: RootState) =>
        selectOffers(state)
    );

    const sortedOffers = [...offers];
    sortedOffers.sort(
        (prev, next) => next.monthlyPayment - prev.monthlyPayment
    );

    return (
        <section className='giftbox'>
            <div className='giftbox__items container'>
                {sortedOffers.map((offer, index) => {
                    return (
                        <Offer
                            key={index}
                            applicationId={offer.applicationId}
                            requestedAmount={offer.requestedAmount}
                            totalAmount={offer.totalAmount}
                            term={offer.term}
                            rate={offer.rate}
                            monthlyPayment={offer.monthlyPayment}
                            isInsuranceEnabled={offer.isInsuranceEnabled}
                            isSalaryClient={offer.isSalaryClient}
                        />
                    );
                })}
            </div>
        </section>
    );
};
export { Offers };

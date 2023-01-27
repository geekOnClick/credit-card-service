import { IPair } from 'types/home';

const ExchangeItem = (pair: IPair) => {
    const { from, course } = pair;

    return (
        <div className='exchange__item d-flex justify-content-between'>
            <span className='exchange__item-currency'>{from}</span>
            <span className='exchange__item-value'>{course}</span>
        </div>
    );
};
export { ExchangeItem };

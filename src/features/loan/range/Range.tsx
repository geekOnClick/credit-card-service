import { useRange } from 'features/loan/range/use-range';

const Range = () => {
    const [updatedRange, handleChange] = useRange();

    return (
        <div className='customize__calc-content'>
            <h4 className='customize__select-amount-text'>Select amount</h4>
            <span className='customize__select-amount'>{updatedRange}</span>
            <form className='customize__range range'>
                <div className='form-group range__slider'>
                    <input
                        type='range'
                        step='500'
                        id='amount'
                        name='amount'
                        min='15000'
                        max='600000'
                        onChange={handleChange}
                    />
                </div>
            </form>
            <div className='customize__range-prices'>
                <label className='customize__range-min-price' htmlFor='min'>
                    15 000
                </label>
                <label className='customize__range-max-price' htmlFor='max'>
                    600 000
                </label>
            </div>
        </div>
    );
};
export { Range };

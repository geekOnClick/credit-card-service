import { SubscribeForm } from './SubscribeForm';

const Subscribe = () => {
    return (
        <div className='subscribe subscribe_spacing d-flex flex-column align-items-center'>
            <div className='subscribe__title'>Support</div>
            <h3 className='subscribe__text subscribe__text_weight'>
                Subscribe Newsletter & get
            </h3>
            <h3 className='subscribe__text'>Bank News</h3>
            <SubscribeForm />
        </div>
    );
};
export { Subscribe };

import { Button } from 'components/common/Button';
import { useSubscribe } from 'hooks/use-subscribe';
const SubscribeForm = () => {
    const { subscribed, error, subscribe } = useSubscribe();
    return (
        <>
            {subscribed && (
                <h4 className='subscribe__subscribed'>
                    You are already subscribed to the bank&apos;s newsletter
                </h4>
            )}
            {error && (
                <h4 className='subscribe__error'>
                    Error occured. Try again later.
                </h4>
            )}
            {!subscribed && !error && (
                <form
                    className='subscribe-form subscribe-form_spacing d-flex align-items-center justify-content-between'
                    action='#'
                >
                    <div className='subscribe-form__email-wrapper'>
                        <input
                            className='subscribe-form__email'
                            type='email'
                            name='email'
                            placeholder='Your email'
                        />
                    </div>
                    <Button
                        title='Subscribe'
                        additional_class='subscribe-form__btn'
                        callback={subscribe}
                    />
                </form>
            )}
        </>
    );
};
export { SubscribeForm };

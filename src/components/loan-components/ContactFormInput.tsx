import { IFormInput } from 'types/loan';
import { Field, ErrorMessage } from 'formik';

const ContactFormInput: React.FC<IFormInput> = (props: IFormInput) => {
    const { id, placeholder, error, touched, validateFunc } = props;

    return (
        <>
            <Field
                id={id}
                className={`form__field ${
                    error && touched ? 'input-error' : ''
                }`}
                name={id}
                type='text'
                placeholder={placeholder}
                validate={validateFunc}
            />

            {error && touched && (
                <svg
                    width='18'
                    height='18'
                    className='icon-svg'
                    viewBox='0 0 18 18'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9ZM4.29289 13.7071C3.90237 13.3166 3.90237 12.6834 4.29289 12.2929L7.58579 9L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L9 7.58579L12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289C14.0976 4.68342 14.0976 5.31658 13.7071 5.70711L10.4142 9L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L9 10.4142L5.70711 13.7071C5.31658 14.0976 4.68342 14.0976 4.29289 13.7071Z'
                        fill='#FF5631'
                    />
                </svg>
            )}
            {!error && touched && (
                <svg
                    width='18'
                    height='18'
                    className='icon-svg'
                    viewBox='0 0 18 18'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18ZM8.76822 12.6402L13.7682 6.64018L12.2318 5.35982L7.9328 10.5186L5.70711 8.29289L4.29289 9.70711L7.29289 12.7071L8.0672 13.4814L8.76822 12.6402Z'
                        fill='#008000'
                        fillOpacity='0.8'
                    />
                </svg>
            )}
            {error && touched && (
                <ErrorMessage name={id}>
                    {(msg) => <div className='form__error'>{msg}</div>}
                </ErrorMessage>
            )}
        </>
    );
};
export { ContactFormInput };

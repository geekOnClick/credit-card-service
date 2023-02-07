import { IFormItem } from 'types/loan';
import { ContactFormInput } from './ContactFormInput';
import { ContactFormLabel } from './ContactFormLabel';
import { ContactFormSelect } from './ContactFormSelect';
const ContactFormItem: React.FC<IFormItem> = (props: IFormItem) => {
    const { title, inputPlaceholder, id, required, error, touched, validateFunc } = props;

    return (
        <div className='form__wrapper-input'>
            <ContactFormLabel id={id} title={title} required={required} />
            {inputPlaceholder && (
                <div className='input__wrapper'>
                    {validateFunc && (
                        <ContactFormInput
                            placeholder={inputPlaceholder}
                            id={id}
                            error={error}
                            touched={touched}
                            validateFunc={validateFunc}
                        />
                    )}
                    {!validateFunc && <ContactFormInput placeholder={inputPlaceholder} id={id} error={error} touched={touched} />}
                </div>
            )}
            {!inputPlaceholder && <ContactFormSelect id={id} />}
            {/* {error && touched && <div>{error}</div>} */}
        </div>
    );
};
export { ContactFormItem };

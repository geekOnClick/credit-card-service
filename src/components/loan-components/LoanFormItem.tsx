import { IFormItem } from 'types/loan';
import { LoanFormInput } from './LoanFormInput';
import { LoanFormLabel } from './LoanFormLabel';
import { LoanFormSelect } from './LoanFormSelect';
const LoanFormItem: React.FC<IFormItem> = (props: IFormItem) => {
    const {
        title,
        inputPlaceholder,
        id,
        required,
        error,
        touched,
        validateFunc,
    } = props;

    return (
        <div className='form__wrapper-input'>
            <LoanFormLabel id={id} title={title} required={required} />
            {inputPlaceholder && (
                <div className='input__wrapper'>
                    {validateFunc && (
                        <LoanFormInput
                            placeholder={inputPlaceholder}
                            id={id}
                            error={error}
                            touched={touched}
                            validateFunc={validateFunc}
                        />
                    )}
                    {!validateFunc && (
                        <LoanFormInput
                            placeholder={inputPlaceholder}
                            id={id}
                            error={error}
                            touched={touched}
                        />
                    )}
                </div>
            )}
            {!inputPlaceholder && <LoanFormSelect id={id} />}
            {/* {error && touched && <div>{error}</div>} */}
        </div>
    );
};
export { LoanFormItem };

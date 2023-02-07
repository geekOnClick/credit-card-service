import { Field, ErrorMessage } from 'formik';
import { IScoringSelect } from 'types/applicationId';
import { DropDownList } from '../common/DropDownList';

const ScoringSelect: React.FC<IScoringSelect> = (props: IScoringSelect) => {
    const { id, options, error, touched, validateFunc } = props;

    return (
        <>
            <Field
                as='select'
                // component={DropDownList}
                className={`continuation-form__field ${
                    error && touched ? 'input-error' : ''
                }`}
                option=''
                name={id}
                id={id}
                // defaultValue=''
                // options={options}
                validate={validateFunc}
            >
                <option value='' disabled hidden></option>
                {options.map((option, i) => {
                    return (
                        <option
                            key={i}
                            className='form__dropdown-list-item'
                            value={option}
                        >
                            {option}
                        </option>
                    );
                })}
            </Field>
            {error && touched && (
                <ErrorMessage name={id}>
                    {(msg) => <div className='form__error'>{msg}</div>}
                </ErrorMessage>
            )}
        </>
    );
};
export { ScoringSelect };

import { IFormLabel } from 'types/loan';

const LoanFormLabel: React.FC<IFormLabel> = (props: IFormLabel) => {
    const { id, title, required } = props;

    return (
        <label htmlFor={id} className={`form__text`}>
            {title}
            {required && <span className='form__text-red'> *</span>}
        </label>
    );
};
export { LoanFormLabel };

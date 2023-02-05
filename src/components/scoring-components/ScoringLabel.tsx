import { IFormLabel } from 'types/loan';

const ScoringLabel: React.FC<IFormLabel> = (props: IFormLabel) => {
    const { id, title, required } = props;

    return (
        <label htmlFor={id} className={`continuation-form__text`}>
            {title}
            {required && <span className='form__text-red'> *</span>}
        </label>
    );
};
export { ScoringLabel };

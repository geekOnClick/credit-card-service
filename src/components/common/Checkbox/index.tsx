import { ICheckbox } from 'types/applicationId';
const Checkbox: React.FC<ICheckbox> = (props: ICheckbox) => {
    const { name, checked, callback } = props;

    return (
        <input
            className='signingDoc__input'
            type='checkbox'
            name={name}
            id=''
            checked={checked}
            onChange={() => {
                if (callback) callback();
            }}
        />
    );
};
export { Checkbox };

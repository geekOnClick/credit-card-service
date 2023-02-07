import { IBtn } from 'types/common';

const Button: React.FC<IBtn> = (props: IBtn) => {
    const { title, additional_class, type, disabled, callback } = props;

    return (
        <button
            disabled={disabled}
            type={type}
            className={'btn ' + additional_class}
            onClick={() => {
                if (callback) callback(event);
            }}
        >
            {title}
        </button>
    );
};
export { Button };

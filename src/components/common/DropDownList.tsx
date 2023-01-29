import { IDropDownList } from 'types/common';
const DropDownList = ({ options }: IDropDownList) => {
    return (
        <select className='form__field form__field-color-black'>
            {options.map((option, i) => {
                return (
                    <option
                        key={i}
                        className='form__dropdown-list-item'
                        value={option}
                    >
                        {option} month
                    </option>
                );
            })}
        </select>
    );
};
export { DropDownList };

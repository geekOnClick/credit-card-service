import { Field } from 'formik';
import { IFormSelect } from 'types/loan';
import { DropDownList } from '../../DropDownList';

const ContactFormSelect: React.FC<IFormSelect> = (props: IFormSelect) => {
    const { id } = props;
    const options = [6, 12, 18, 24];
    return <Field component={DropDownList} name={id} id={id} options={options}></Field>;
};
export { ContactFormSelect };

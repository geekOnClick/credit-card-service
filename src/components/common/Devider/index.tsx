import { IDevider } from 'types/common';
const Devider: React.FC<IDevider> = (props: IDevider) => {
    const { additional_class } = props;
    return <div data-testid='devider' className={additional_class}></div>;
};
export { Devider };

import { Devider } from 'components/common/Devider';
import { IStep } from 'types/loan';
const Step: React.FC<IStep> = (props: IStep) => {
    const { number, title } = props;
    return (
        <div
            className={`step ${number === 1 && 'step__first'}${number === 2 && 'step__second'} ${number === 3 && 'step__third'}`}
        >
            <div className='step__progress d-flex justify-content-center justify-content-lg-between align-items-center'>
                <div className='step-num'>{number}</div>
                <Devider additional_class='step-separator' />
            </div>
            <p className='step__description'>{title}</p>
        </div>
    );
};
export { Step };

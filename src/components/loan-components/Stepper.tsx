import { Step } from './Step';

const Stepper = () => {
    return (
        <div className='stepper stepper_spacing d-flex justify-content-between'>
            <Step
                number={1}
                title='Fill out an online application - you do not
need to visit the bank'
            />
            <Step
                number={2}
                title="Find out the bank's decision immediately after
filling out the application"
            />
            <Step
                number={3}
                title='The bank will deliver the card free of charge, wherever
convenient, to your city'
            />
        </div>
    );
};
export { Stepper };

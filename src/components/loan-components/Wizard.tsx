import { Customizer } from './Customizer';
import { Stepper } from './Stepper';
const Wizard = () => {
    return (
        <div className='wizard wizard_spacing d-flex flex-column justify-content-center'>
            <h4 id='apply-card' className='wizard__title'>
                <a href='#apply-card' aria-hidden='true'>
                    How to get a card
                </a>
            </h4>
            <Stepper />
            <Customizer />
        </div>
    );
};
export { Wizard };

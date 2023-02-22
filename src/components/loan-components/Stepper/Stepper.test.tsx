import { render } from '@testing-library/react';
import { Stepper } from '.';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';

describe('Stepper test', () => {
    it('renders Stepper', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Stepper />
                </MemoryRouter>
            </Provider>
        );
        const elem = document.querySelector('.stepper');
        expect(elem).toBeInTheDocument();
    });
    it('has 3 steps', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Stepper />
                </MemoryRouter>
            </Provider>
        );
        const elem = document.querySelector('.stepper');
        if (elem) expect(elem.childElementCount).toBe(3);
    });
});

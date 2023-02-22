import { render } from '@testing-library/react';
import { Wizard } from '.';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';

describe('Wizard test', () => {
    it('renders Wizard', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Wizard />
                </MemoryRouter>
            </Provider>
        );
        const elem = document.querySelector('.wizard');
        expect(elem).toBeInTheDocument();
    });
    it('always contains Stepper', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Wizard />
                </MemoryRouter>
            </Provider>
        );
        const elem = document.querySelector('.stepper');
        expect(elem).toBeInTheDocument();
    });
});

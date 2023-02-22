import { render, screen, waitFor } from '@testing-library/react';
import { Step } from '.';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';

describe('Step test', () => {
    it('renders Step', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Step
                        number={1}
                        title='Fill out an online application - you do not
need to visit the bank'
                    />
                </MemoryRouter>
            </Provider>
        );
        const elem = screen.getByText(/Fill out an online/i);
        expect(elem).toBeInTheDocument();
    });
    it('has Devider', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Step
                        number={1}
                        title='Fill out an online application - you do not
need to visit the bank'
                    />
                </MemoryRouter>
            </Provider>
        );
        waitFor(() => {
            const elem = document.querySelector('.step-separator');
            expect(elem).toBeInTheDocument();
        });
    });
});

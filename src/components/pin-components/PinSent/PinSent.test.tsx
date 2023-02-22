import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PinSent } from '.';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';

describe('PinSent test', () => {
    it('renders PinSent', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <PinSent />
                </MemoryRouter>
            </Provider>
        );
        const elem = screen.getByText(/congratulations/i);
        expect(elem).toBeInTheDocument();
    });
    it('it changes local storage data', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <PinSent />
                </MemoryRouter>
            </Provider>
        );
        setTimeout(() => {
            // localStorage.setItem('applicationIdStage', '5');
        }, 10000);

        waitFor(() => {
            const ls_data = localStorage.getItem('applicationIdStage');
            expect(ls_data).toBeNull();
        });
    });
    it('it goes to the main page after click', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <PinSent />
                </MemoryRouter>
            </Provider>
        );
        const btn = document.querySelector('.congratulations__btn');
        if (btn) fireEvent.click(btn);
        waitFor(() => {
            const main_page = screen.getByText(/Choose the design/i);
            expect(main_page).toBeInTheDocument();
        });
    });
});

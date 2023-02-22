import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { HeaderNav } from '.';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';
import { App } from 'App';

describe('HeaderNav test', () => {
    it('renders header nav', () => {
        render(
            <MemoryRouter>
                <HeaderNav />
            </MemoryRouter>
        );
        const elem = screen.getByRole('navigation');
        expect(elem).toBeInTheDocument();
    });
    it('it has link that navigates to loan page', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <App />
                </MemoryRouter>
            </Provider>
        );
        act(() => {
            const elem = document.getElementById('header-link');
            if (elem) fireEvent.click(elem);
        });
        waitFor(() => {
            const loan_page_elem = screen.getByText('Platinum digital');
            expect(loan_page_elem).toBeInTheDocument();
        });
    });
});

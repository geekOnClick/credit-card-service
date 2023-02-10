import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { HeaderLogo } from '.';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';
import { App } from 'App';

describe('Header logo', () => {
    it('renders header logo', () => {
        render(
            <MemoryRouter>
                <HeaderLogo />
            </MemoryRouter>
        );
        const elem = screen.getByTestId('header-logo');
        expect(elem).toBeInTheDocument();
    });
    it('it navigates to main page', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <App />
                </MemoryRouter>
            </Provider>
        );
        act(() => {
            const elem = screen.getByTestId('header-logo');
            fireEvent.click(elem);
        });
        waitFor(() => {
            const main_page_elem = screen.getByText('Choose the design');
            expect(main_page_elem).toBeInTheDocument();
        });
    });
});

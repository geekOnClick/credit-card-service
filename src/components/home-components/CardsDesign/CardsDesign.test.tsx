import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { CardsDesign } from '.';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';
import { App } from 'App';

describe('CardsDesign test', () => {
    it('renders CardsDesign', () => {
        render(
            <MemoryRouter>
                <CardsDesign />
            </MemoryRouter>
        );
        const elem = screen.getByText(/Choose the design you like/i);
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
            const elem = screen.getByText('Choose the card');
            fireEvent.click(elem);
        });
        waitFor(() => {
            const loan_page_elem = screen.getByText('Platinum digital');
            expect(loan_page_elem).toBeInTheDocument();
        });
    });
    it('renders images', () => {
        render(
            <MemoryRouter>
                <CardsDesign />
            </MemoryRouter>
        );
        const elem = screen.getByAltText('promo-card 1');
        expect(elem).toBeInTheDocument();
    });
});

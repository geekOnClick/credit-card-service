import { render, waitFor } from '@testing-library/react';
import { Offers } from '.';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';

describe('Offers test', () => {
    it('renders Offers', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Offers />
                </MemoryRouter>
            </Provider>
        );
        const elem = document.querySelector('.giftbox');
        expect(elem).toBeInTheDocument();
    });
    it('has Offer', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Offers />
                </MemoryRouter>
            </Provider>
        );
        waitFor(() => {
            const elem = document.querySelector('.giftbox__item');
            expect(elem).toBeInTheDocument();
        });
    });
});

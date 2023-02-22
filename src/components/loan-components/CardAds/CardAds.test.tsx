import { render, screen } from '@testing-library/react';
import { CardAds } from '.';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';

describe('CardAds test', () => {
    it('renders CardAds', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <CardAds />
                </MemoryRouter>
            </Provider>
        );
        const elem = screen.getByText(/Platinum digital/i);
        expect(elem).toBeInTheDocument();
    });
    it('has tooltip', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <CardAds />
                </MemoryRouter>
            </Provider>
        );
        const elem = screen.getByText(/When repaying the full/i);
        expect(elem).toBeInTheDocument();
    });
});

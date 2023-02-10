import { render, screen } from '@testing-library/react';
import { Exchange } from '.';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';

describe('Exchange test', () => {
    it('renders Exchange', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Exchange />
                </MemoryRouter>
            </Provider>
        );
        const elem = screen.getByText(/Exchange rate/i);
        expect(elem).toBeInTheDocument();
    });
    it('has exchage list', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Exchange />
                </MemoryRouter>
            </Provider>
        );
        const elem = screen.getByTestId('exchange-list');
        expect(elem).toBeInTheDocument();
    });
});

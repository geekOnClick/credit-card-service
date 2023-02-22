import { render, screen } from '@testing-library/react';
import { Subscribe } from '.';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';

describe('Subscribe test', () => {
    it('renders Subscribe', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Subscribe />
                </MemoryRouter>
            </Provider>
        );
        const elem = screen.getByText(/Support/i);
        expect(elem).toBeInTheDocument();
    });
    it('has Subscribe form', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Subscribe />
                </MemoryRouter>
            </Provider>
        );
        const elem = screen.getByTestId('subscribe-form');
        expect(elem).toBeInTheDocument();
    });
});

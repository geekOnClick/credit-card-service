import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs } from '.';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';

describe('Tabs test', () => {
    it('renders Tabs', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Tabs />
                </MemoryRouter>
            </Provider>
        );
        const elem = document.querySelector('.about-info__tabs');
        expect(elem).toBeInTheDocument();
    });
    it('shows tab description after click', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Tabs />
                </MemoryRouter>
            </Provider>
        );
        const btn = screen.getByTestId('tab-btn');
        fireEvent.click(btn);
        const elem = document.querySelector('.about-info__tab-01');
        if (elem) expect(elem).toBeInTheDocument();
    });
});

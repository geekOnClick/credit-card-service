import { render, screen } from '@testing-library/react';
import { Customizer } from '.';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';

describe('Customizer test', () => {
    it('renders Customizer', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Customizer />
                </MemoryRouter>
            </Provider>
        );
        const elem = screen.getByText('Customize your card');
        expect(elem).toBeInTheDocument();
    });
    it('has range', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Customizer />
                </MemoryRouter>
            </Provider>
        );
        const elem = screen.getByTestId('range');
        expect(elem).toBeInTheDocument();
    });
});

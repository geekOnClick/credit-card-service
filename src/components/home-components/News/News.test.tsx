import { render, screen } from '@testing-library/react';
import { News } from '.';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';

describe('News test', () => {
    it('renders News', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <News />
                </MemoryRouter>
            </Provider>
        );
        const elem = screen.getByText(/Current news/i);
        expect(elem).toBeInTheDocument();
    });
    it('has news slider', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <News />
                </MemoryRouter>
            </Provider>
        );
        const elem = screen.getByTestId('news-slider');
        expect(elem).toBeInTheDocument();
    });
});

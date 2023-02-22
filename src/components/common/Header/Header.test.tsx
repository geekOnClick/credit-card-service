import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '.';

describe('Header component', () => {
    it('renders header', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
        const elem = screen.getByTestId('header');
        expect(elem).toBeInTheDocument();
    });
    it('has burger menu as a child', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
        const elem = screen.getByTestId('burger-menu');
        expect(elem).toBeInTheDocument();
    });
});

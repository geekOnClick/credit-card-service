import { render, screen } from '@testing-library/react';
import { Footer } from '.';

describe('Footer component', () => {
    it('renders footer contacts', () => {
        render(<Footer />);
        const elem = screen.getByTestId('footer');
        expect(elem).toBeInTheDocument();
    });
    it('has footer contacts as a child', () => {
        render(<Footer />);
        const elem = screen.getByTestId('footer-contacts');
        expect(elem).toBeInTheDocument();
    });
});

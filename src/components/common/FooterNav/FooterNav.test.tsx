import { render, screen } from '@testing-library/react';
import { FooterNav } from '.';

describe('FooterNav component', () => {
    it('renders footer contacts', () => {
        render(<FooterNav />);
        const elem = screen.getByTestId('footer-nav');
        expect(elem).toBeInTheDocument();
    });
    it('has "li" in childrens', () => {
        render(<FooterNav />);
        const elem = screen.getByTestId('footer-nav');
        expect(elem.childElementCount).toBe(10);
    });
});

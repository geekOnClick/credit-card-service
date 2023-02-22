import { render, screen } from '@testing-library/react';
import { FooterContacts } from '.';

describe('FooterContacts component', () => {
    it('renders footer contacts', () => {
        render(<FooterContacts />);
        const elem = screen.getByTestId('footer-contacts');
        expect(elem).toBeInTheDocument();
    });
    it('it has "contacts" class', () => {
        render(<FooterContacts />);
        const elem = screen.getByTestId('footer-contacts');
        expect(elem).toHaveClass('contacts');
    });
});

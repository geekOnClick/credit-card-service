import { render, screen } from '@testing-library/react';
import { FooterLogo } from '.';

describe('FooterLogo component', () => {
    it('renders footer contacts', () => {
        render(<FooterLogo />);
        const elem = screen.getByTestId('footer-logo');
        expect(elem).toBeInTheDocument();
    });
    it('it has image', () => {
        render(<FooterLogo />);
        const testImage = document.querySelector('img') as HTMLImageElement;
        expect(testImage.alt).toContain('logo');
    });
});

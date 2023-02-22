import { render, screen } from '@testing-library/react';
import { Devider } from '.';

describe('devider component', () => {
    it('renders devider', () => {
        render(<Devider additional_class='step-separator' />);
        const devider = screen.getByTestId('devider');
        expect(devider).toBeInTheDocument();
    });
    it('it has additional class', () => {
        render(<Devider additional_class='step-separator' />);
        const devider = screen.getByTestId('devider');
        expect(devider).toHaveClass('step-separator');
    });
});

import { render, screen } from '@testing-library/react';
import { Presence } from '.';

describe('Presence test', () => {
    it('renders Presence', () => {
        render(<Presence />);
        const elem = screen.getByText(/You can use our services/i);
        expect(elem).toBeInTheDocument();
    });
});

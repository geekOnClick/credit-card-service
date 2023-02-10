import { render, screen } from '@testing-library/react';
import { Features } from '.';

describe('Features test', () => {
    it('renders Features', () => {
        render(<Features />);
        const elem = screen.getByText(/We Provide Many Features/i);
        expect(elem).toBeInTheDocument();
    });
});

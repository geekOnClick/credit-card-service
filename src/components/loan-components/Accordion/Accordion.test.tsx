import { render, screen, fireEvent } from '@testing-library/react';
import { Accordion } from '.';

describe('Accordion test', () => {
    it('renders Accordion', () => {
        render(<Accordion key={1} title={'test'} content={'test'} />);
        const elem = screen.getByText('test');
        expect(elem).toBeInTheDocument();
    });
    it('shows description after click', () => {
        render(<Accordion key={1} title={'test'} content={'test'} />);
        const elem = screen.getByTestId('accordion-item');
        fireEvent.click(elem);
        const text = screen.getByTestId('accordion-content');
        expect(text).toBeInTheDocument();
    });
    it('has arrow icon', () => {
        render(<Accordion key={1} title={'test'} content={'test'} />);
        const elem = screen.getByAltText('svg');
        expect(elem).toBeInTheDocument();
    });
});

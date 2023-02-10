import { render, screen } from '@testing-library/react';
import { Tooltip } from '.';

describe('Tooltip component', () => {
    it('renders tooltip', () => {
        render(
            <Tooltip text='When repaying the full debt up to 160 days.'>
                <div className='payment-info__details'>
                    <p className='payment-info__details_bold'>Up to 160 days</p>
                    <p>No percent</p>
                </div>
            </Tooltip>
        );
        const elem = screen.getByText(/When repaying the full debt/i);
        expect(elem).toBeInTheDocument();
    });
    it('renders children', () => {
        render(
            <Tooltip text='When repaying the full debt up to 160 days.'>
                <div className='payment-info__details'>
                    <p className='payment-info__details_bold'>Up to 160 days</p>
                    <p>No percent</p>
                </div>
            </Tooltip>
        );
        const child = screen.getByText('No percent');
        expect(child).toBeInTheDocument();
    });
});

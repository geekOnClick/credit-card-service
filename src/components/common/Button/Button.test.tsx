import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '.';

describe('button component', () => {
    it('renders button', () => {
        render(<Button title='test' additional_class='btn_online' />);
        const btn = screen.getByText('test');
        expect(btn).toBeInTheDocument();
    });
    it('has disabled attribute', () => {
        render(<Button title='test' additional_class='btn_online' disabled={true} />);
        const btn = screen.getByText('test');
        expect(btn).toBeDisabled();
    });
    it('calls callback on click', () => {
        const callback = jest.fn();
        render(<Button title='test' additional_class='btn_online' callback={callback} />);
        const btn = screen.getByText('test');
        fireEvent.click(btn);
        expect(callback).toHaveBeenCalled();
    });
});

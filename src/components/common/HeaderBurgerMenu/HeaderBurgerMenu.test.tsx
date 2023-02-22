import { render, screen, fireEvent } from '@testing-library/react';
import { HeaderBurgerMenu } from '.';

describe('burger menu component', () => {
    it('renders burger menu', () => {
        render(<HeaderBurgerMenu />);
        const burgerMenu = screen.getByText('Credit card');
        expect(burgerMenu).toBeInTheDocument();
    });
    it('it opens and closes', () => {
        render(<HeaderBurgerMenu />);
        const btn = screen.getByTestId('burger-menu');
        const link = screen.getByText(/Credit card/i);
        expect(link).toContainHTML('');
        fireEvent.click(btn);
        expect(link).toContainHTML('Credit card');
        fireEvent.click(btn);
        expect(link).toContainHTML('');
    });
    it('burger menu consists Online Bank button', () => {
        render(<HeaderBurgerMenu />);
        const onlineBankBtn = screen.getByText(/online bank/i);
        expect(onlineBankBtn).toBeInTheDocument();
    });
});

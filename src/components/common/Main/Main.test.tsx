import { render, screen } from '@testing-library/react';
import { Main } from '.';

describe('Main component', () => {
    it('renders Main', () => {
        render(
            <Main>
                <p>test</p>
            </Main>
        );
        const main = screen.getByRole('main');
        expect(main).toBeInTheDocument();
    });
    it('renders children', () => {
        render(
            <Main>
                <p>test</p>
            </Main>
        );
        const child = screen.getByText('test');
        expect(child).toBeInTheDocument();
    });
});

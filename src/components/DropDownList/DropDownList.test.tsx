import { render, screen } from '@testing-library/react';
import { DropDownList } from '.';

describe('dropdownlist component', () => {
    const test_options = [1, 2];
    it('renders dropdownlist', () => {
        render(<DropDownList options={test_options} />);
        const ddl = screen.getByTestId('select');
        expect(ddl).toBeInTheDocument();
    });
    it('has option in childrens', () => {
        render(<DropDownList options={test_options} />);
        const ddl = screen.getByTestId('select');
        expect(ddl.childElementCount).toBe(2);
    });
});

import { render, screen, fireEvent } from '@testing-library/react';
import { store } from 'store';
import { changescheduleChecked } from 'features/loan/applicationId/applicationId-slice';
import { Checkbox } from '.';

describe('checkbox component', () => {
    it('renders checkbox', () => {
        render(<Checkbox checked={true} name={'Agree'} callback={() => store.dispatch(changescheduleChecked(true))} />);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeInTheDocument();
    });
    it("it hasn't checked", () => {
        render(
            <Checkbox
                name={'Agree'}
                callback={() => {
                    console.log();
                }}
                checked={false}
            />
        );
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).not.toBeChecked();
    });
    it('it calls callback', () => {
        const callback = jest.fn();
        render(<Checkbox name={'Agree'} callback={callback} checked={false} />);
        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);
        expect(callback).toBeCalled();
    });
});

import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';
import { Range } from './Range';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';

describe('Range test', () => {
    it('renders Range', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Range />
                </MemoryRouter>
            </Provider>
        );
        const elem = screen.getByText('Select amount');
        expect(elem).toBeInTheDocument();
    });
    it('dispatch changes', () => {
        const dispatchEventSpy = jest.spyOn(document, 'dispatchEvent');

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Range />
                </MemoryRouter>
            </Provider>
        );
        act(() => {
            const elem = screen.getByText('Select amount');
            fireEvent.change(elem);
        });
        waitFor(() => {
            expect(dispatchEventSpy).toHaveBeenCalledWith(expect.any(Event));
            expect(dispatchEventSpy.mock.calls[0][0].type).toBe('Range test');
        });
    });
});

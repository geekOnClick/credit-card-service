import { render, screen, act, waitFor, fireEvent } from '@testing-library/react';
import { ScoringForm } from '.';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';

describe('ScoringForm test', () => {
    it('renders ScoringForm', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ScoringForm applicationId={'1'} account={'test'} />
                </MemoryRouter>
            </Provider>
        );
        const elem = screen.getByTestId('scoring-form');
        expect(elem).toBeInTheDocument();
    });
    it('has button', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ScoringForm applicationId={'1'} account={'test'} />
                </MemoryRouter>
            </Provider>
        );
        const elem = document.querySelector('.continuation-form__btn');
        expect(elem).toBeInTheDocument();
    });
    it('submits form', () => {
        const dispatchEventSpy = jest.spyOn(document, 'dispatchEvent');
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ScoringForm applicationId={'1'} account={'test'} />
                </MemoryRouter>
            </Provider>
        );
        act(() => {
            const form = screen.getByTestId('scoring-form');
            fireEvent.submit(form);
        });
        waitFor(() => {
            expect(dispatchEventSpy).toHaveBeenCalledWith(expect.any(Event));
            expect(dispatchEventSpy.mock.calls[0][0].type).toBe('ScoringForm test');
        });
    });
});

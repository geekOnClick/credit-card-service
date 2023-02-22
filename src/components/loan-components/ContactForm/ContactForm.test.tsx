import { render, screen, act, waitFor, fireEvent } from '@testing-library/react';
import { ContactForm } from '.';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';

describe('ContactForm test', () => {
    it('renders ContactForm', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ContactForm />
                </MemoryRouter>
            </Provider>
        );
        const elem = screen.getByTestId('contact-form');
        expect(elem).toBeInTheDocument();
    });
    it('has button', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ContactForm />
                </MemoryRouter>
            </Provider>
        );
        const elem = document.querySelector('.form__btn');
        expect(elem).toBeInTheDocument();
    });
    it('submits form', () => {
        const dispatchEventSpy = jest.spyOn(document, 'dispatchEvent');
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ContactForm />
                </MemoryRouter>
            </Provider>
        );
        act(() => {
            const form = screen.getByTestId('contact-form');
            fireEvent.submit(form);
        });
        waitFor(() => {
            expect(dispatchEventSpy).toHaveBeenCalledWith(expect.any(Event));
            expect(dispatchEventSpy.mock.calls[0][0].type).toBe('ContactForm test');
        });
    });
});

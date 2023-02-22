import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { Modal } from '.';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';

describe('Modal test', () => {
    it('renders modal', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Modal
                        title='Deny application'
                        text='You exactly sure, you want to cancel this application?'
                        closeModal={() => {
                            console.log();
                        }}
                    />
                </MemoryRouter>
            </Provider>
        );
        const elem = screen.getByTestId('modal');
        expect(elem).toBeInTheDocument();
    });
    it('it clears data when accepted', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Modal
                        title='Deny application'
                        text='You exactly sure, you want to cancel this application?'
                        closeModal={() => {
                            console.log();
                        }}
                    />
                </MemoryRouter>
            </Provider>
        );
        act(() => {
            const elem_btn = document.querySelector('.modal__btn-deny');
            if (elem_btn) fireEvent.click(elem_btn);
        });
        waitFor(() => {
            const ls_data = localStorage.getItem('applicationId');
            expect(ls_data).toBeNull();
        });
    });
    it('it goes to main page when clicked "Go home"', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Modal
                        title='Deny application'
                        text='You exactly sure, you want to cancel this application?'
                        closeModal={() => {
                            console.log();
                        }}
                    />
                </MemoryRouter>
            </Provider>
        );
        act(() => {
            const elem_btn = document.querySelector('.modal__btn-deny');
            if (elem_btn) fireEvent.click(elem_btn);
        });
        waitFor(() => {
            const btn = document.querySelector('.paymentShedule__btn');
            if (btn) {
                act(() => {
                    fireEvent.click(btn);
                });
            }
        });
        waitFor(() => {
            const main_page_elem = screen.getByText('Choose the design');
            expect(main_page_elem).toBeInTheDocument();
        });
    });
});

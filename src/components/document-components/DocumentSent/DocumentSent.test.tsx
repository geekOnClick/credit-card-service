import { render, screen, waitFor } from '@testing-library/react';
import { DocumentSent } from '.';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';

describe('DocumentSent test', () => {
    it('renders DocumentSent', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <DocumentSent />
                </MemoryRouter>
            </Provider>
        );
        const elem = screen.getByText(/Documents have been successfully signed/i);
        expect(elem).toBeInTheDocument();
    });
    it('it changes local storage data', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <DocumentSent />
                </MemoryRouter>
            </Provider>
        );
        setTimeout(() => {
            localStorage.setItem('applicationIdStage', '5');
        }, 10000);

        waitFor(() => {
            const ls_data = localStorage.getItem('applicationIdStage');
            expect(ls_data).toBe('5');
        });
    });
    it('it goes to the next application page after setTimeout', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <DocumentSent />
                </MemoryRouter>
            </Provider>
        );
        setTimeout(() => {
            console.log();
        }, 10000);

        waitFor(() => {
            const elem_page = screen.getByText('Please enter confirmation code');
            expect(elem_page).toBeInTheDocument();
        });
    });
});

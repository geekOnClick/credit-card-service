import { render, screen, waitFor } from '@testing-library/react';
import { ScoringSent } from '.';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';

describe('ScoringSent test', () => {
    it('renders ScoringSent', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ScoringSent />
                </MemoryRouter>
            </Provider>
        );
        const elem = screen.getByText(/Wait for a decision/i);
        expect(elem).toBeInTheDocument();
    });
    it('it changes local storage data', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ScoringSent />
                </MemoryRouter>
            </Provider>
        );
        setTimeout(() => {
            // localStorage.setItem('applicationIdStage', '5');
        }, 10000);

        waitFor(() => {
            const ls_data = localStorage.getItem('applicationIdStage');
            expect(ls_data).toBe('3');
        });
    });
    it('it goes to the next application page after setTimeout', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ScoringSent />
                </MemoryRouter>
            </Provider>
        );
        setTimeout(() => {
            console.log();
        }, 10000);

        waitFor(() => {
            const elem_page = screen.getByText(/Payment Schedule/i);
            expect(elem_page).toBeInTheDocument();
        });
    });
});

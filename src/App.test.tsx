import { render, screen, act, waitFor } from '@testing-library/react';
import { App } from './App';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';
import axios from 'axios';

const localStorageMock = (function () {
    let store: Record<string, string> = {};

    return {
        getItem(key: string) {
            return store[key];
        },

        setItem(key: string, value: string) {
            store[key] = value;
        },

        clear() {
            store = {};
        },

        removeItem(key: string) {
            delete store[key];
        },

        getAll() {
            return store;
        },
    };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

jest.mock('axios');
describe('App', () => {
    const preloadedState = {
        id: 123,
        client: {
            firstName: 'Ivan',
            lastName: 'Ivanov',
            middleName: 'Ivanovich',
            email: 'iivanov@email.com',
            gender: 'MALE',
            birthdate: '2023-02-09',
            passportSeries: '1234',
            passportNumber: '123456',
            passportIssueDate: '2023-02-09',
            passportIssueBranch: '123-456',
            maritalStatus: 'SINGLE',
            dependentAmount: 1,
            employment: {
                employmentStatus: 'EMPLOYED',
                employerINN: '123456789012',
                salary: 100000,
                position: 'WORKER',
                workExperienceTotal: 15,
                workExperienceCurrent: 4,
            },
            account: '11223344556677889900',
        },
        credit: {
            amount: 1000000,
            term: 24,
            monthlyPayment: 10000.1,
            rate: 12.5,
            psk: 12.5,
            isInsuranceEnabled: true,
            isSalaryClient: true,
            paymentSchedule: [
                {
                    number: 1,
                    date: '2023-02-09',
                    totalPayment: 12000,
                    interestPayment: 12000,
                    debtPayment: 8000,
                    remainingDebt: 92000,
                },
            ],
        },
        status: 'REQUEST_DENIED',
        creationDate: '2023-02-09T14:56:02.081Z',
        signDate: '2023-02-09T14:56:02.081Z',
        sesCode: '1234',
        statusHistory: [
            {
                status: 'REQUEST_DENIED',
                time: '2023-02-09T14:56:02.081Z',
                changeType: 'AUTOMATIC',
            },
        ],
    };

    let response: unknown;
    beforeEach(() => {
        response = {
            data: preloadedState,
        };
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders all apllication', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <App />
                </MemoryRouter>
            </Provider>
        );
        const header_el = screen.getByText('NeoBank');
        expect(header_el).toBeInTheDocument();
    });
    it('it navigates from header to loan page', () => {
        const root = document.createElement('div');
        document.body.appendChild(root);
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <App />
                </MemoryRouter>
            </Provider>
        );
        act(() => {
            const link = document.getElementById('header-link');
            link?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        expect(document.body.textContent).toContain('About');
    });
    it('it saves application id got from server', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        axios.get.mockReturnValue(response);
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/loan/123']}>
                    <App />
                </MemoryRouter>
            </Provider>
        );
        waitFor(() => {
            expect(localStorage.getItem('applicationId')).toBe('123');
        });
    });
});

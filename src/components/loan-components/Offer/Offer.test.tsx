import { waitFor, render, screen } from '@testing-library/react';
import { renderWithProviders } from 'test_utils';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';
import { Offer } from '.';
import axios from 'axios';

jest.mock('axios');

describe('Offer component', () => {
    let response: unknown;
    let responseEror: unknown;
    beforeEach(() => {
        response = {
            data: {
                status: 'Ok',
            },
        };
        responseEror = {
            data: undefined,
        };
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('renders subscribe form ', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Offer
                        key={1}
                        applicationId={1}
                        requestedAmount={120}
                        totalAmount={100}
                        term={6}
                        rate={2}
                        monthlyPayment={20}
                        isInsuranceEnabled={true}
                        isSalaryClient={true}
                    />
                </MemoryRouter>
            </Provider>
        );
        const elem = document.querySelector('.giftbox__item');
        expect(elem).toBeInTheDocument();
    });
    it('sends chosed offer', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        axios.get.mockReturnValue(response);
        const { getByText } = renderWithProviders(
            <Offer
                key={1}
                applicationId={1}
                requestedAmount={120}
                totalAmount={100}
                term={6}
                rate={2}
                monthlyPayment={20}
                isInsuranceEnabled={true}
                isSalaryClient={true}
            />,
            {}
        );
        waitFor(() => {
            const elem = getByText(/The preliminary decision/i);
            expect(elem).toBeInTheDocument();
        });
    });
    it('updates data in local storage', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        axios.get.mockReturnValue(response);
        const { getByText } = renderWithProviders(
            <Offer
                key={1}
                applicationId={1}
                requestedAmount={120}
                totalAmount={100}
                term={6}
                rate={2}
                monthlyPayment={20}
                isInsuranceEnabled={true}
                isSalaryClient={true}
            />,
            {}
        );
        waitFor(() => {
            const elem = localStorage.getItem('stage');
            expect(elem).toBe(3);
        });
    });
});

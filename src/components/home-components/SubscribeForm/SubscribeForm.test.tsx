import { waitFor, render, screen } from '@testing-library/react';
import { renderWithProviders } from 'test_utils';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';
import { SubscribeForm } from '.';
import axios from 'axios';

jest.mock('axios');

describe('SubscribeForm component', () => {
    let response: unknown;
    let responseEror: unknown;
    beforeEach(() => {
        response = {
            data: {
                email: 'ivanov@mail.com',
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
                    <SubscribeForm />
                </MemoryRouter>
            </Provider>
        );
        const elem = screen.getByTestId('subscribe-form');
        expect(elem).toBeInTheDocument();
    });
    it('sends email', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        axios.get.mockReturnValue(response);
        const { getByText } = renderWithProviders(<SubscribeForm />, {});
        waitFor(() => {
            const elem = getByText(/You are already subscribed/i);
            expect(elem).toBeInTheDocument();
        });
    });
    it('shows error when error occured', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        axios.get.mockReturnValue(responseEror);
        const { getByText } = renderWithProviders(<SubscribeForm />, {});
        waitFor(() => {
            const err_elem = getByText(/Error occured/i);
            expect(err_elem).toBeInTheDocument();
        });
    });
});

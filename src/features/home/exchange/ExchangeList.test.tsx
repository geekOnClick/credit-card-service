import { waitFor } from '@testing-library/react';
import { renderWithProviders } from 'test_utils';
import { Status } from 'types/status';
import { IRootState } from 'types/store';
import { ExchangeList } from './ExchangeList';
import axios from 'axios';

jest.mock('axios');

describe('Exchange list component', () => {
    const preloadedState = {
        status: 'received' as Status,
        error: null,
        pairs: [
            {
                from: 'USD',
                to: 'RUB',
            },
            {
                from: 'EUR',
                to: 'RUB',
            },
            {
                from: 'JPY',
                to: 'RUB',
            },
            {
                from: 'GBP',
                to: 'RUB',
            },
            {
                from: 'CNH',
                to: 'RUB',
            },
            {
                from: 'DKK',
                to: 'RUB',
            },
        ],
        list: [
            {
                from: 'USD',
                to: 'RUB',
                course: 4.3,
            },
            {
                from: 'EUR',
                to: 'RUB',
                course: 4.61,
            },
            {
                from: 'JPY',
                to: 'RUB',
                course: 0.03,
            },
            {
                from: 'GBP',
                to: 'RUB',
                course: 5.19,
            },
            {
                from: 'CNH',
                to: 'RUB',
                course: 0.63,
            },
            {
                from: 'DKK',
                to: 'RUB',
                course: 0.62,
            },
        ],
    };

    let response: unknown;
    let responseEror: unknown;
    beforeEach(() => {
        response = {
            data: 0.619800715,
        };
        responseEror = {
            data: undefined,
        };
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('renders exchange list', () => {
        const { getByText } = renderWithProviders(<ExchangeList></ExchangeList>, {
            preloadedState: { exchange: preloadedState } as IRootState,
        });
        const elem = getByText('4.61');
        expect(elem).toBeInTheDocument();
    });
    it('receives and renders exchange', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        axios.get.mockReturnValue(response);
        const { getByText } = renderWithProviders(<ExchangeList></ExchangeList>, {});
        waitFor(() => {
            const elem = getByText('0.62');
            expect(elem).toBeInTheDocument();
        });
    });
    it('shows error when no data received', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        axios.get.mockReturnValue(responseEror);
        const { getByText } = renderWithProviders(<ExchangeList></ExchangeList>, {});
        waitFor(() => {
            const err_elem = getByText(/get exchange list/i);
            expect(err_elem).toBeInTheDocument();
        });
    });
});

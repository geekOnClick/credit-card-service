import { waitFor } from '@testing-library/react';
import { renderWithProviders } from 'test_utils';
import { Status } from 'types/status';
import { IRootState } from 'types/store';
import { NewsSlider } from './NewsSlider';
import axios from 'axios';

jest.mock('axios');

describe('News Slider component', () => {
    const preloadedState = {
        status: 'received' as Status,
        error: null,
        list: [
            {
                source: {
                    id: null,
                    name: "Investor's Business Daily",
                },
                author: null,
                title: "Dow Jones Futures: Market Rally Gets Its Shakeout, Tesla Stock Doubles From Bear Low | Investor's Business Daily - Investor's Business Daily",
                description: 'Read this article by clicking here...',
                url: 'https://www.investors.com/market-trend/stock-market-today/dow-jones-futures-market-rally-gets-its-shakeout-tesla-stock-doubles-from-bear-low/',
                urlToImage: null,
                publishedAt: '2023-02-10T00:26:00Z',
                content: null,
            },
        ],
    };

    let response: unknown;
    let responseEror: unknown;
    beforeEach(() => {
        response = {
            data: {
                source: {
                    id: null,
                    name: "Investor's Business Daily",
                },
                author: null,
                title: "Dow Jones Futures: Market Rally Gets Its Shakeout, Tesla Stock Doubles From Bear Low | Investor's Business Daily - Investor's Business Daily",
                description: 'Read this article by clicking here...',
                url: 'https://www.investors.com/market-trend/stock-market-today/dow-jones-futures-market-rally-gets-its-shakeout-tesla-stock-doubles-from-bear-low/',
                urlToImage: null,
                publishedAt: '2023-02-10T00:26:00Z',
                content: null,
            },
        };
        responseEror = {
            data: undefined,
        };
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('renders news slider ', () => {
        const { getByText } = renderWithProviders(<NewsSlider />, {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            preloadedState: { news: preloadedState } as IRootState,
        });
        const elem = getByText(/Dow Jones Futures/i);
        expect(elem).toBeInTheDocument();
    });
    it('receives and renders news', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        axios.get.mockReturnValue(response);
        const { getByText } = renderWithProviders(<NewsSlider />, {});
        waitFor(() => {
            const elem = getByText(/Dow Jones Futures/i);
            expect(elem).toBeInTheDocument();
        });
    });
    it('shows error when no data received', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        axios.get.mockReturnValue(responseEror);
        const { getByText } = renderWithProviders(<NewsSlider />, {});
        waitFor(() => {
            const err_elem = getByText(/get news list/i);
            expect(err_elem).toBeInTheDocument();
        });
    });
});

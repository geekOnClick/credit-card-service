import { IExchangeSlice } from 'features/home/exchange/exchange-slice';
import { INewsSlice } from 'features/home/news/news-slice';
import { IApplicationId } from 'features/loan/applicationId/applicationId-slice';
import { ILoanSlice } from 'features/loan/application/loan-slice';
export interface IRootState {
    exchange: IExchangeSlice;
    news: INewsSlice;
    loan: ILoanSlice;
    applicationId: IApplicationId;
}

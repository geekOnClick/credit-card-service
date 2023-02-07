import { IPair } from './types/home';

// GET news:
export const ACTUAL_NEWS = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=26117cff601544f5b4be2768788b8104`;

// GET courses:
export const ACTUAL_COURSES_HEADERS = {
    'X-RapidAPI-Key': 'aec3842a6cmsh2f3487da45acac6p124f36jsn95d5161c12ca',
    'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com',
};
export const ACTUAL_COURSES = (pair: IPair) =>
    `https://currency-exchange.p.rapidapi.com/exchange?from=${pair.from}&${pair.to}=MYR&q=1.0`;

// POST subscribe
export const SUBSCRIBE_TO_NEWS = '/email';

// POST contact form
export const SUBMIT_FORM = '/application';

// POST select offer
export const SELECT_OFFER = 'application/apply';

// GET current application
export const GET_CURRENT_APPLICATION = (applicationId: string | number) => `/admin/application/${applicationId}`;

// POST scoring form
export const SCORING_FORM = (applicationId: string | number) => `application/registration/${applicationId}`;

// POST deny application
export const DENY_APP = (applicationId: string | number) => `/application/${applicationId}/deny`;

// POST: accept schedule and prepare document
export const ACCEPT_SCHEDULE = (applicationId: string | number) => `/document/${applicationId}`;

// POST: sign document
export const ACCEPT_DOCUMENT = (applicationId: string | number) => `/document/${applicationId}/sign`;

// POST: send SesCode
export const SEND_CODE = (applicationId: string | number) => `/document/${applicationId}/sign/code`;

import { IPair } from './types';

// GET news:
export const ACTUAL_NEWS = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`;

// GET courses:
export const ACTUAL_COURSES_HEADERS = {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST,
};
export const ACTUAL_COURSES = (pair: IPair) =>
    `https://currency-exchange.p.rapidapi.com/exchange?from=${pair.from}&${pair.to}=MYR&q=1.0`;

// POST subscribe
export const SUBSCRIBE_TO_NEWS = '/email';

// POST form
export const SUBMIT_FORM = '/application';

import { Axios } from 'axios';
import * as API from '_config';

export type Extra = {
    client: Axios;
    api: typeof API;
};

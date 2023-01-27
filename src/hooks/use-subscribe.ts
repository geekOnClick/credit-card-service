import { useState, useEffect } from 'react';
import axios from 'axios';
import * as api from '_config';
export const useSubscribe = (): {
    subscribed: boolean;
    error: boolean;
    subscribe: (e: MouseEvent) => Promise<void>;
} => {
    const [subscribed, setSubscribed] = useState(false);
    const [error, setError] = useState(false);

    const subscribe = async (e: MouseEvent) => {
        e.preventDefault();
        await axios
            .post(api.SUBSCRIBE_TO_NEWS, {})
            .then(() => {
                setSubscribed(true);
                localStorage.setItem('subscribed', `true`);
            })
            .catch((err) => {
                console.log(err);
                setError(true);
            });

        // if (data.request.status < 400) {
        //     setSubscribed(true);
        //     localStorage.setItem('subscribed', `true`);
        // } else {
        //     console.log('2');

        //     setError(true);
        // }
    };

    useEffect(() => {
        const checkSubscribtion = localStorage.getItem('subscribed');
        if (checkSubscribtion === 'true') setSubscribed(true);
    }, []);

    return { subscribed, error, subscribe };
};

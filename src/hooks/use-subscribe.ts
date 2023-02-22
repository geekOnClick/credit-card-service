import { useState, useEffect } from 'react';
import axios from 'axios';
import * as api from '_config';
export const useSubscribe = (
    email: string
): {
    subscribed: boolean;
    error: boolean;
    subscribe: (e: MouseEvent) => Promise<void>;
} => {
    const [subscribed, setSubscribed] = useState(false);
    const [error, setError] = useState(false);

    const subscribe = async (event: MouseEvent) => {
        event.preventDefault();
        await axios
            .post(api.SUBSCRIBE_TO_NEWS, {
                email: `${email}`,
            })
            .then(() => {
                setSubscribed(true);
                localStorage.setItem('subscribed', `true`);
            })
            .catch(() => {
                setError(true);
            });
    };

    useEffect(() => {
        const checkSubscribtion = localStorage.getItem('subscribed');
        if (checkSubscribtion === 'true') setSubscribed(true);
    }, []);

    return { subscribed, error, subscribe };
};

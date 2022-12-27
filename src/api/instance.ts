import axios from 'axios';

export const mainInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URI,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

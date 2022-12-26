import axios from 'axios';

export const mainInstance = axios.create({
    baseURL: 'https://api.friendlycarrier.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

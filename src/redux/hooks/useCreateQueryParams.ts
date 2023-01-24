import { NextRouter } from 'next/router';
import React from 'react';
import { navigateTo } from 'src/interfaces/navigate';

export const useCreateQueryParams = (route: string, router: NextRouter) => {
    switch (route) {
        case navigateTo.ORDER:
            return { orderId: router.query.orderId };
        case navigateTo.USER:
            return { userId: router.query.userId };
        default:
            break;
    }
};

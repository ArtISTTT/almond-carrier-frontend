import { NextRouter } from 'next/router';
import { navigateTo } from 'src/interfaces/navigate';

export const useCreateQueryParams = (route: string, router: NextRouter) => {
    return () => {
        switch (route) {
            case navigateTo.ORDER:
                return { orderId: router.query.orderId };
            case navigateTo.USER:
                return { userId: router.query.userId };
            default:
                break;
        }
    };
};

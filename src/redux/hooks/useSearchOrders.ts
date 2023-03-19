import { useTranslation } from 'next-i18next';
import { useContext, useState } from 'react';
import { searchOrders } from '../../api/order';
import { OpenAlertContext } from '../../Components/Layouts/Snackbar';
import { IOrder } from '../../interfaces/order';
import {
    carriersFilter,
    OrderSeachType,
    receiversFilter,
} from '../../interfaces/order-search';
import { parseOrderDataFromApi } from './../../helpers/parseOrderDataFromApi';

type IReturn = {
    isLoading: boolean;
    reload: (
        filters: carriersFilter | receiversFilter,
        type: OrderSeachType,
        page: number
    ) => Promise<{ orders: IOrder[]; count: number }>;
    error: string | undefined;
};

export const SEARCH_TABLE_LIMIT = 8;

export const useSearchOrders = (): IReturn => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const { triggerOpen } = useContext(OpenAlertContext);

    const reload = async (
        filters: carriersFilter | receiversFilter,
        type: OrderSeachType,
        page: number
    ): Promise<{ orders: IOrder[]; count: number }> => {
        setIsLoading(true);
        setError(undefined);

        const searchFilters = filters;

        if (
            !searchFilters.fromLocation ||
            searchFilters.fromLocation?.length === 0
        ) {
            searchFilters.fromLocationBounds = undefined;
            searchFilters.fromLocation_placeId = undefined;
            searchFilters.fromLocation = undefined;
        }

        if (
            !searchFilters.toLocation ||
            searchFilters.toLocation?.length === 0
        ) {
            searchFilters.toLocationBounds = undefined;
            searchFilters.toLocation_placeId = undefined;
            searchFilters.toLocation = undefined;
        }

        const data = await searchOrders({
            filters,
            type,
            start: SEARCH_TABLE_LIMIT * (page - 1),
            limit: SEARCH_TABLE_LIMIT,
        });

        if (data.ok && data.orders) {
            setError(undefined);
            const parsedOrders = await parseOrderDataFromApi(data.orders);
            setIsLoading(false);

            return {
                orders: parsedOrders,
                count: data.count
                    ? Math.ceil(data.count / SEARCH_TABLE_LIMIT)
                    : 1,
            };
        } else {
            setError(t('errorSearchingOrders') as string);

            triggerOpen({
                severity: 'error',
                text: data.error || t('errorSearchingOrders'),
            });
        }

        setIsLoading(false);

        return { orders: [], count: 1 };
    };

    return { reload, isLoading, error };
};

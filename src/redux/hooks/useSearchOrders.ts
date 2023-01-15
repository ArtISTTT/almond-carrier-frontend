import { parseOrderDataFromApi } from './../../helpers/parseOrderDataFromApi';
import { useAppDispatch } from './index';
import { useContext, useState } from 'react';
import { searchOrders } from '../../api/order';
import { OpenAlertContext } from '../../Components/Layouts/Snackbar';
import {
    OrderSeachType,
    carriersFilter,
    receiversFilter,
} from '../../interfaces/order-search';
import { IOrder } from '../../interfaces/order';

type IReturn = {
    isLoading: boolean;
    reload: (
        filters: carriersFilter | receiversFilter,
        type: OrderSeachType
    ) => Promise<IOrder[]>;
    error: string | undefined;
};

export const useSearchOrders = (): IReturn => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const { triggerOpen } = useContext(OpenAlertContext);

    const reload = async (
        filters: carriersFilter | receiversFilter,
        type: OrderSeachType
    ): Promise<IOrder[]> => {
        setIsLoading(true);
        setError(undefined);
        const data = await searchOrders({ filters, type });

        if (data.ok && data.orders) {
            setError(undefined);
            setIsLoading(false);

            return parseOrderDataFromApi(data.orders);
        } else {
            setError('Error while searching orders');

            triggerOpen({
                severity: 'error',
                text: data.error || 'Error while searching orders',
            });
        }

        setIsLoading(false);

        return [];
    };

    return { reload, isLoading, error };
};

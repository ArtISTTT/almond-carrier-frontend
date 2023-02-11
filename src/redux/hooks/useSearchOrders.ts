import { useTranslation } from 'next-i18next';
import { parseOrderDataFromApi } from './../../helpers/parseOrderDataFromApi';
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
    const { t } = useTranslation();
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
            setError(t('errorSearchingOrders') as string);

            triggerOpen({
                severity: 'error',
                text: data.error || t('errorSearchingOrders'),
            });
        }

        setIsLoading(false);

        return [];
    };

    return { reload, isLoading, error };
};

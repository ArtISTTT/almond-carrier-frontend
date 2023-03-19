import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getMyOrders } from '../../api/order';
import { OpenAlertContext } from '../../Components/Layouts/Snackbar';
import { parseOrderDataFromApi } from '../../helpers/parseOrderDataFromApi';
import { setMyOrders } from '../slices/ordersSlice';
import { useAppDispatch } from './index';

type IReturn = {
    isLoading: boolean;
    reload: () => Promise<void>;
    error: string | undefined;
};

export const useLoadOwnOrders = (): IReturn => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const { triggerOpen } = useContext(OpenAlertContext);

    const reload = async () => {
        setIsLoading(true);
        setError(undefined);
        const data = await getMyOrders();

        if (data.ok && data.orders) {
            dispatch(setMyOrders(await parseOrderDataFromApi(data.orders)));
            setError(undefined);
        } else {
            setError(t('errorUploadingOrders') as string);

            triggerOpen({
                severity: 'error',
                text: data.error || (t('errorUploadingOrders') as string),
            });
        }

        setIsLoading(false);
    };

    return { reload, isLoading, error };
};

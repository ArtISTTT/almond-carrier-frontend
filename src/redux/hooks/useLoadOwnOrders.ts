import { useAppDispatch } from './index';
import { useContext, useState } from 'react';
import { getMyOrders } from '../../api/order';
import { setMyOrders } from '../slices/ordersSlice';
import { OpenAlertContext } from '../../Components/Layouts/Snackbar';

type IReturn = {
    isLoading: boolean;
    reorder: () => void;
};

export const useLoadOwnOrders = () => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const { triggerOpen } = useContext(OpenAlertContext);

    const reload = async () => {
        setIsLoading(true);
        setError(undefined);
        const data = await getMyOrders();

        if (data.ok && data.orders) {
            dispatch(setMyOrders(data.orders));
            setError(undefined);
        } else {
            setError('Error while uploading your orders');

            triggerOpen({
                severity: 'error',
                text: data.error || 'Error while uploading your orders',
            });
        }

        setIsLoading(false);
    };

    return { reload, isLoading, error };
};

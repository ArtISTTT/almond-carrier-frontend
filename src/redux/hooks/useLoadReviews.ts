import { getReviews } from './../../api/review';
import { useAppDispatch } from './index';
import { useContext, useState } from 'react';
import { getMyOrders } from '../../api/order';
import { OpenAlertContext } from '../../Components/Layouts/Snackbar';
import { useTranslation } from 'react-i18next';
import { IReview } from 'src/interfaces/api/review';

type IReturn = {
    isLoading: boolean;
    reload: () => Promise<void>;
    error: string | undefined;
    reviews: IReview[];
};

export const useLoadReviews = (userId: string): IReturn => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const [reviews, setReviews] = useState<IReview[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const { triggerOpen } = useContext(OpenAlertContext);

    const reload = async () => {
        setIsLoading(true);
        setError(undefined);
        const data = await getReviews(userId);

        if (data.ok) {
            setReviews(data.reviews);
            console.log(data.reviews);
            setError(undefined);
        } else {
            setError('Ошибка при загрузке отзывов' as string); // ЛОКАЛИЗАЦИЯ

            triggerOpen({
                severity: 'error',
                text: 'Ошибка при загрузке отзывов' as string, // ЛОКАЛИЗАЦИЯ
            });
        }

        setIsLoading(false);
    };

    return { reload, isLoading, error, reviews };
};

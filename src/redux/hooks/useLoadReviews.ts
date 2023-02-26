import { getReviews } from './../../api/review';
import { useContext, useState } from 'react';
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
            setError(undefined);
        } else {
            setError(t('errorLoadingReviews') as string);

            triggerOpen({
                severity: 'error',
                text: t('errorLoadingReviews'),
            });
        }

        setIsLoading(false);
    };

    return { reload, isLoading, error, reviews };
};

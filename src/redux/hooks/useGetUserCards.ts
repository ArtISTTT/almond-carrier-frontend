import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getUserCards } from 'src/api/order';
import { OpenAlertContext } from 'src/Components/Layouts/Snackbar';
import { ICard } from 'src/interfaces/order';

export const useGetUserCards = () => {
    const { t } = useTranslation();
    const { triggerOpen } = useContext(OpenAlertContext);
    const [isCardLoading, setIsLoading] = useState(false);
    const [cards, setCards] = useState<ICard[]>([]);

    const userCards = async () => {
        setIsLoading(true);

        const data = await getUserCards();

        if (data.ok && data.cards) {
            setCards(data.cards);
        } else {
            triggerOpen({
                severity: 'error',
                text: data.error || t('errorWhenLoadingCards'),
            });
            setCards([]);
        }
        setIsLoading(false);
    };

    return { isCardLoading, cards, userCards };
};

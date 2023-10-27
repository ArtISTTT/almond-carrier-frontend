import { useTranslation } from 'next-i18next';
import { useContext, useState } from 'react';
import { getPayouts } from 'src/api/order';
import { OpenAlertContext } from 'src/Components/Layouts/Snackbar';
import { parsePayoutsFromApi } from 'src/helpers/parsePayoutsFromApi';
import { IPayout } from 'src/interfaces/order';
import { useGetBanks } from './useGetBanks';

export const useGetUserPayouts = () => {
    const { t } = useTranslation();
    const { triggerOpen } = useContext(OpenAlertContext);
    const [isLoading, setIsLoading] = useState(false);
    const [payouts, setPayouts] = useState<IPayout[]>([]);
    const { banksArray } = useGetBanks({});

    const userPayouts = async () => {
        setIsLoading(true);
        const data = await getPayouts();

        if (data.ok && data.payouts) {
            setPayouts(
                await parsePayoutsFromApi({
                    payouts: data.payouts,
                    banks: banksArray,
                })
            );
        } else {
            triggerOpen({
                severity: 'error',
                text: data.error || t('errorLoadingPayouts'),
            });
            setPayouts([]);
        }
        setIsLoading(false);
    };

    return { payouts, userPayouts, isLoading };
};

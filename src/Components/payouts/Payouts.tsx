import { Pagination } from '@mui/material';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getPayouts } from 'src/api/order';
import { LoaderColors } from 'src/interfaces/loader';
import { IPayout } from 'src/interfaces/order';
import { Currency } from 'src/interfaces/settings';
import useFormatAmount from 'src/redux/hooks/useFormatAmount';
import { useGetThisPagePayouts } from 'src/redux/hooks/useGetThisPageOrders';
import styles from '../../../styles/Payments.module.css';
import { OpenAlertContext } from '../Layouts/Snackbar';
import CircleLoader from '../Loaders/CircleLoader';
import PaymentsTable from './PayoutsTable';

const Payouts = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = React.useState<number>(1);
    const { t } = useTranslation();
    const formatAmount = useFormatAmount();
    const { triggerOpen } = useContext(OpenAlertContext);
    const [payouts, setPayouts] = useState<IPayout[]>([]);
    const thisPagePayouts = useGetThisPagePayouts({ payouts, page });

    const getUserPayouts = async () => {
        setIsLoading(true);
        const data = await getPayouts();

        if (data.ok && data.payouts) {
            setPayouts(data.payouts);
            setIsLoading(false);
        } else {
            triggerOpen({
                severity: 'error',
                text: data.error || t('errorLoadingPayouts'),
            });
            setIsLoading(false);
        }
    };

    const handleChangePagination = async (
        _: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value);
    };

    const totalCountPages = useMemo(() => {
        return Math.ceil(payouts.length / 8);
    }, [payouts]);

    const totalPayoutAmount = useMemo(() => {
        return payouts.reduce((acc, payout) => acc + payout.rewardAmount, 0);
    }, [payouts]);

    useEffect(() => {
        getUserPayouts();
    }, []);

    return (
        <div className={styles.paymentWrapper}>
            <div className={styles.payoutHeader}>
                <div className={styles.paymentTitle}>{t('yourPayouts')}</div>
                <div className={styles.paymentTotalAmount}>
                    {t('total')}
                    {': '}
                    {formatAmount(totalPayoutAmount, Currency.RUB, true)}
                </div>
            </div>
            {isLoading ? (
                <div className={styles.loaderWrapper}>
                    <CircleLoader color={LoaderColors.PRIMARY} />
                </div>
            ) : (
                <PaymentsTable payouts={thisPagePayouts} />
            )}
            {totalCountPages > 1 && (
                <Pagination
                    className={styles.pagination}
                    onChange={handleChangePagination}
                    count={totalCountPages}
                    variant='outlined'
                    color='primary'
                />
            )}
        </div>
    );
};

export default Payouts;

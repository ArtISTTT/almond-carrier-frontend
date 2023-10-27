import AddIcon from '@mui/icons-material/Add';
import { Pagination, Skeleton } from '@mui/material';
import cn from 'classnames';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getSavedCardUrl } from 'src/api/order';
import { ICard } from 'src/interfaces/order';
import { Currency } from 'src/interfaces/settings';
import useFormatAmount from 'src/redux/hooks/useFormatAmount';
import { useGetCurrentPagePayouts } from 'src/redux/hooks/useGetCurrentPage';
import { useGetUserCards } from 'src/redux/hooks/useGetUserCards';
import { useGetUserPayouts } from 'src/redux/hooks/useGetUserPayouts';
import styles from '../../../styles/Payments.module.css';
import EmptyBlock from '../EmptyComponents/EmptyOrderBlock';
import { OpenAlertContext } from '../Layouts/Snackbar';
import CardItem from './CardItem';
import PaymentsTable from './PayoutsTable';

const Payouts = () => {
    const { t } = useTranslation();
    const { triggerOpen } = useContext(OpenAlertContext);

    const formatAmount = useFormatAmount();

    const { payouts, userPayouts, isLoading } = useGetUserPayouts();

    const { cards, isCardLoading, userCards } = useGetUserCards();

    const [page, setPage] = useState<number>(1);

    const [selectedCard, setSelectedCard] = useState<ICard | undefined>();

    const [savedUrl, setSavedUrl] = useState('');

    useEffect(() => {
        userPayouts();
        userCards();
    }, []);

    const currentPagePayouts = useGetCurrentPagePayouts({ payouts, page });

    const handleChangePagination = async (
        _: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value);
    };

    const onSetSelectedCard = (value: ICard) => setSelectedCard(value);

    const onAddNewCard = async () => {
        if (savedUrl) return;

        setSavedUrl('*');

        const data = await getSavedCardUrl();

        if (data.ok && data.url) {
            setSavedUrl(data.url);
            window.open(data.url, '_blank');
        } else {
            triggerOpen({
                severity: 'error',
                text: t('errorAddingNewMethod'),
            });
            setSavedUrl('');
        }
    };

    const totalCountPages = useMemo(() => {
        return Math.ceil(payouts.length / 8);
    }, [payouts]);

    const totalPayoutAmount = useMemo(() => {
        return payouts.reduce((acc, payout) => acc + payout.rewardAmount, 0);
    }, [payouts]);

    return (
        <div className={styles.paymentWrapper}>
            <div className={styles.payoutHeader}>
                <div className={styles.paymentTitle}>
                    {t('withdrawMethods')}
                </div>
            </div>
            <div className={styles.cardsWrapper}>
                {cards && !isCardLoading ? (
                    cards.map((item, key) => {
                        return (
                            <CardItem
                                key={key}
                                {...item}
                                selectedCard={selectedCard}
                                onSetSelectedCard={onSetSelectedCard}
                            />
                        );
                    })
                ) : (
                    <>
                        <Skeleton
                            variant='rounded'
                            width={360}
                            height={100}
                            animation='wave'
                        />
                        <Skeleton
                            variant='rounded'
                            width={360}
                            height={100}
                            animation='wave'
                        />
                        <Skeleton
                            variant='rounded'
                            width={360}
                            height={100}
                            animation='wave'
                        />
                    </>
                )}
                <div
                    className={cn(styles.cardItemWrapper, {
                        [styles.centerCardItemWrapper]: true,
                        [styles.disabledAddNewCard]: Boolean(savedUrl),
                    })}
                    onClick={onAddNewCard}
                >
                    <div className={styles.emptyCardItemTitle}>
                        {t('addPaymentMethod')}
                    </div>
                    <AddIcon />
                </div>
            </div>
            <div className={styles.payoutHeader}>
                <div className={styles.paymentTitle}>
                    {t('withdrawHistory')}
                </div>
                <div className={styles.paymentTotalAmount}>
                    {t('total')}
                    {': '}
                    {formatAmount(totalPayoutAmount, Currency.RUB, true)}
                </div>
            </div>
            {isLoading ? (
                <div className={styles.loaderWrapper}>
                    <Skeleton
                        variant='rounded'
                        width='100%'
                        height={600}
                        animation='wave'
                    />
                </div>
            ) : (
                <>
                    {currentPagePayouts.length > 0 && (
                        <PaymentsTable payouts={currentPagePayouts} />
                    )}
                    {currentPagePayouts.length === 0 && (
                        <div className={styles.emptyPayoutsWrapper}>
                            <EmptyBlock
                                text={'youHaventMadeAnyDealsYet'}
                                helperText={'itsGoodTimeToStart'}
                            />
                        </div>
                    )}
                </>
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

import AddIcon from '@mui/icons-material/Add';
import { Pagination } from '@mui/material';
import cn from 'classnames';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getPayouts, getSavedCardUrl, getUserCards } from 'src/api/order';
import { parsePayoutsFromApi } from 'src/helpers/parsePayoutsFromApi';
import { LoaderColors } from 'src/interfaces/loader';
import { ICard, IPayout } from 'src/interfaces/order';
import { Currency } from 'src/interfaces/settings';
import useFormatAmount from 'src/redux/hooks/useFormatAmount';
import { useGetBanks } from 'src/redux/hooks/useGetBanks';
import { useGetCurrentPagePayouts } from 'src/redux/hooks/useGetCurrentPage';
import styles from '../../../styles/Payments.module.css';
import EmptyBlock from '../EmptyComponents/EmptyOrderBlock';
import { OpenAlertContext } from '../Layouts/Snackbar';
import CircleLoader from '../Loaders/CircleLoader';
import CardItem from './CardItem';
import PaymentsTable from './PayoutsTable';

const useGetUserPayouts = () => {
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

const useGetUserCards = () => {
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
                text: data.error || 'Cards loading error',
            });
            setCards([]);
        }
        setIsLoading(false);
    };

    return { isCardLoading, cards, userCards };
};

const Payouts = () => {
    const [page, setPage] = useState<number>(1);
    const { t } = useTranslation();
    const formatAmount = useFormatAmount();
    const { payouts, userPayouts, isLoading } = useGetUserPayouts();

    const { cards, isCardLoading, userCards } = useGetUserCards();

    const [selectedCard, setSelectedCard] = useState('');

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

    const onSetSelectedCard = (value: string) => setSelectedCard(value);

    const onAddNewCard = async () => {
        const data = await getSavedCardUrl();

        if (data.ok && data.url) {
            setSavedUrl(data.url);
            window.open(data.url, '_blank');
        } else {
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
                {cards &&
                    cards.map((item, key) => {
                        return (
                            <CardItem
                                key={key}
                                {...item}
                                selectedCard={selectedCard}
                                onSetSelectedCard={onSetSelectedCard}
                            />
                        );
                    })}
                <div
                    className={cn(styles.cardItemWrapper, {
                        [styles.centerCardItemWrapper]: true,
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
                    <CircleLoader color={LoaderColors.PRIMARY} />
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

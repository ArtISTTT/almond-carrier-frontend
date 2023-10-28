import AddIcon from '@mui/icons-material/Add';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Button, Skeleton } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { useContext, useEffect, useState } from 'react';
import { getSavedCardUrl, startPayout } from 'src/api/order';
import { ICard, IOrderFull } from 'src/interfaces/order';
import { useGetUserCards } from 'src/redux/hooks/useGetUserCards';
import styles from '../../../styles/OrderPage.module.css';
import { OpenAlertContext } from '../Layouts/Snackbar';
import CardItem from '../Payouts/CardItem';

type IProps = {
    order: IOrderFull;
};

const OrderChoosePaymentMethod: React.FC<IProps> = ({ order }) => {
    const { t } = useTranslation();

    const { triggerOpen } = useContext(OpenAlertContext);

    const [isPaymentWindowOpened, setIsPaymentWindowOpened] = useState(false);

    const [selectedCard, setSelectedCard] = useState<ICard | undefined>();

    const [savedUrl, setSavedUrl] = useState('');

    const onSetSelectedCard = (value: ICard) => setSelectedCard(value);

    const { isCardLoading, cards, userCards } = useGetUserCards();

    const onToggleIsPaymentWindowOpened = () =>
        setIsPaymentWindowOpened(prev => !prev);

    const onAddNewPaymentMethod = async () => {
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

    const onConfirmPayment = async () => {
        if (!selectedCard) return;

        const data = await startPayout({
            orderId: order.id,
            cardId: selectedCard?.id,
        });

        //деньги поступят в течение суток

        if (data.ok) {
            triggerOpen({
                severity: 'success',
                text: t('payoutRequestSuccessfullySent'),
            });
        } else {
            triggerOpen({
                severity: 'error',
                text: t('errorWhenSendingRequestForPayout'),
            });
        }
    };

    useEffect(() => {
        userCards();
    }, []);

    const testCards = [
        {
            id: '1',
            name: 'ARTIK VKSHKIN',
            number: '1234123412341234',
            bankName: 'SBERBANK',
        },
        {
            id: '2',
            name: 'ARTIK VKSHKIN',
            number: '1234123412341234',
            bankName: 'SBERBANK',
        },
        {
            id: '3',
            name: 'ARTIK VKSHKIN',
            number: '1234123412341234',
            bankName: 'SBERBANK',
        },
    ] as ICard[];

    return (
        <>
            {isPaymentWindowOpened && (
                <div className={styles.choosePaymentMethodWrapper}>
                    <div className={styles.choosePaymentMethodInner}>
                        <HighlightOffIcon
                            sx={{ width: 40, height: 40 }}
                            className={styles.choosePaymentMethodCloseIcon}
                            onClick={onToggleIsPaymentWindowOpened}
                        />
                        <div className={styles.choosePaymentMethodTitle}>
                            {t('choosePaymentMethod')}
                        </div>
                        <div className={styles.cardsWrapper}>
                            {isCardLoading ? (
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
                            ) : (
                                <>
                                    {testCards.map((item, key) => (
                                        <CardItem
                                            selectedCard={selectedCard}
                                            onSetSelectedCard={
                                                onSetSelectedCard
                                            }
                                            key={key}
                                            {...item}
                                        />
                                    ))}
                                    <div
                                        onClick={onAddNewPaymentMethod}
                                        className={styles.addNewMethodWrapper}
                                    >
                                        <span>{t('addPaymentMethod')}</span>
                                        <AddIcon />
                                        <div
                                            className={
                                                styles.testPeymentNotification
                                            }
                                        >
                                            {t(
                                                'transactionWillBeRequiredAddPaymentMethodTheMoneyWillReturnedAFewMinutes'
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        {selectedCard && (
                            <div className={styles.confirmButtonWrapper}>
                                <Button
                                    className={styles.buttonItem}
                                    variant='contained'
                                    onClick={onConfirmPayment}
                                    color='primary'
                                    type='submit'
                                >
                                    {t('confirm')}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div className={styles.orderChoosePaymentMethodButtonWrapper}>
                <Button
                    className={styles.buttonItem}
                    variant='contained'
                    onClick={onToggleIsPaymentWindowOpened}
                    color='primary'
                    type='submit'
                >
                    {t('withdraw')}
                </Button>
            </div>
        </>
    );
};

export default OrderChoosePaymentMethod;

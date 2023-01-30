import React from 'react';
import styles from '../../../styles/OrderSearch.module.css';
import { Avatar, Button, Tooltip } from '@mui/material';
import cn from 'classnames';
import { IOrder } from '../../interfaces/order';
import { useTranslation } from 'next-i18next';
import ReceiverApplyPopup from './ReceiverApplyPopup';
import { toggleHtmlScroll } from '../../helpers/toggleHtmlScroll';
import useFormatAmount from 'src/redux/hooks/useFormatAmount';
import { Currency } from 'src/interfaces/settings';

type IProps = {
    order: IOrder;
};

const SearchTableOrderReceiver: React.FC<IProps> = ({ order }) => {
    const { t } = useTranslation();
    const formatAmount = useFormatAmount();

    const [isPopupOpen, setIsPopupOpen] = React.useState(false);

    const openPopupFunc = () => {
        toggleHtmlScroll(true);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        toggleHtmlScroll(false);
        setIsPopupOpen(false);
    };

    return (
        <div>
            <div className={styles.itemWrapper}>
                {isPopupOpen && (
                    <ReceiverApplyPopup order={order} closePopup={closePopup} />
                )}
                <div className={cn(styles.part, styles.user)}>
                    <Avatar
                        sx={{ width: 60, height: 60, cursor: 'pointer' }}
                        alt='logo'
                        className={styles.avatar}
                    />
                    <div className={styles.userInfo}>
                        <div className={styles.userName}>
                            {order.receiver?.firstName} {order.receiver?.lastName}
                        </div>
                        <div className={cn(styles.infoItem, styles.infoItemRating)}>
                            {t('rating')}: <span>4.64</span>
                        </div>
                        <div
                            className={cn(
                                styles.infoItem,
                                styles.infoItemCompleted
                            )}
                        >
                            {t('completedOrders')}: <span>16</span>
                        </div>
                    </div>
                </div>
                <div className={cn(styles.part, styles.fromTo, styles.doubleditem)}>
                    <div>
                        <Tooltip title={order.fromLocation} placement='bottom'>
                            <div className={styles.fromToItem}>
                                <span className={styles.prefix}>{t('from')}:</span>
                                <span className={styles.toAndFromLocationValue}>
                                    {order.fromLocation ?? t('undefined')}
                                </span>
                            </div>
                        </Tooltip>
                        <Tooltip title={order.toLocation} placement='bottom'>
                            <div className={styles.fromToItem}>
                                <span className={styles.prefix}>{t('to')}:</span>
                                <span className={styles.toAndFromLocationValue}>
                                    {order.toLocation}
                                </span>
                            </div>
                        </Tooltip>
                    </div>
                </div>
                <div className={cn(styles.part, styles.productName)}>
                    {order.productName}
                </div>
                <div className={cn(styles.part, styles.doubleditem)}>
                    <div>
                        <div className={styles.benefitPriceItem}>
                            <span className={styles.prefix}>{t('price')}:</span>
                            <span className={styles.benefitPriceValue}>
                                {order.productAmount &&
                                    formatAmount(
                                        order.productAmount,
                                        Currency.RUB,
                                        true
                                    )}
                            </span>
                        </div>

                        <div className={styles.benefitPriceItem}>
                            <span className={styles.prefix}>{t('benefit')}:</span>
                            <span className={styles.benefitPriceValue}>
                                {formatAmount(
                                    order.rewardAmount,
                                    Currency.RUB,
                                    true
                                )}
                            </span>
                        </div>
                    </div>
                </div>
                <div className={cn(styles.part, styles.maxWeight)}>
                    {order.productWeight} {t('kg')}
                </div>
                <div className={cn(styles.part, styles.button)}>
                    <Button
                        onClick={openPopupFunc}
                        variant='contained'
                        className={styles.applyBtn}
                    >
                        {t('apply')}
                    </Button>
                </div>
            </div>
            <div className={styles.hidingButton}>
                <Button
                    onClick={openPopupFunc}
                    variant='contained'
                    className={styles.applyBtn}
                    >
                    {t('apply')}
                </Button>
            </div>
        </div>

    );
};

export default SearchTableOrderReceiver;

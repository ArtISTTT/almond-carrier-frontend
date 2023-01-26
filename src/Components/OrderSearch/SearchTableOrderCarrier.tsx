import React from 'react';
import styles from '../../../styles/OrderSearch.module.css';
import { Avatar, Button, Tooltip } from '@mui/material';
import cn from 'classnames';
import { IOrder } from '../../interfaces/order';
import { useTranslation } from 'next-i18next';
import CarrierApplyPopup from './CarrierApplyPopup';
import { toggleHtmlScroll } from '../../helpers/toggleHtmlScroll';
import useFormatAmount from 'src/redux/hooks/useFormatAmount';
import { Currency } from 'src/interfaces/settings';

type IProps = {
    order: IOrder;
};

const SearchTableOrderCarrier: React.FC<IProps> = ({ order }) => {
    const { t } = useTranslation();
    const formatAmount = useFormatAmount();

    const [isPopupOpen, setIsPopupOpen] = React.useState(false);

    const openPopupFunc = () => {
        setIsPopupOpen(true);
        toggleHtmlScroll(true);
    };

    const closePopup = () => {
        toggleHtmlScroll(false);
        setIsPopupOpen(false);
    };

    return (
        <div className={styles.itemWrapper}>
            {isPopupOpen && (
                <CarrierApplyPopup order={order} closePopup={closePopup} />
            )}
            <div className={cn(styles.part, styles.user)}>
                <Avatar
                    sx={{ width: 60, height: 60, cursor: 'pointer' }}
                    alt='logo'
                    className={styles.avatar}
                />
                <div className={styles.userInfo}>
                    <div className={styles.userName}>
                        {order.carrier?.firstName} {order.carrier?.lastName}
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
                                {order.fromLocation}
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
            <div className={cn(styles.part, styles.flightDate)}>
                {order.arrivalDate?.format('DD.MM.YYYY')}
            </div>
            <div className={cn(styles.part, styles.benefit)}>
                {formatAmount(order.rewardAmount, Currency.RUB, true)}
            </div>
            <div className={cn(styles.part, styles.maxWeight)}>
                {order.carrierMaxWeight} {t('kg')}
            </div>
            <div className={cn(styles.part)}>
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

export default SearchTableOrderCarrier;

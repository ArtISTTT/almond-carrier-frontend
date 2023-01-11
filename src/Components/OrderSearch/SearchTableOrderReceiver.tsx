import React from 'react';
import styles from '../../../styles/OrderSearch.module.css';
import { Avatar, Button } from '@mui/material';
import cn from 'classnames';
import { IOrder } from '../../interfaces/order';
import { useTranslation } from 'next-i18next';
import ReceiverApplyPopup from './ReceiverApplyPopup';
import { toggleHtmlScroll } from '../../helpers/toggleHtmlScroll';

type IProps = {
    order: IOrder;
};

const SearchTableOrderReceiver: React.FC<IProps> = ({ order }) => {
    const { t } = useTranslation();

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
        <div className={styles.itemWrapper}>
            {isPopupOpen && (
                <ReceiverApplyPopup order={order} closePopup={closePopup} />
            )}
            <div className={cn(styles.part, styles.user)}>
                <Avatar
                    sx={{ width: 60, height: 60, cursor: 'pointer' }}
                    alt='logo'
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
                    <div className={styles.fromToItem}>
                        <span className={styles.prefix}>{t('from')}:</span>
                        <span>{order.fromLocation ?? '?'}</span>
                    </div>
                    <div className={styles.fromToItem}>
                        <span className={styles.prefix}>{t('to')}:</span>
                        <span>{order.toLocation}</span>
                    </div>
                </div>
            </div>
            <div className={cn(styles.part, styles.productname)}>
                {order.productName}
            </div>
            <div className={cn(styles.part, styles.doubleditem)}>
                <div>
                    <div className={styles.fromToItem}>
                        <span className={styles.prefix}>{t('price')}:</span>
                        <span>{order.productAmount}$</span>
                    </div>
                    <div className={styles.fromToItem}>
                        <span className={styles.prefix}>{t('benefit')}:</span>
                        <span>{order.rewardAmount}$</span>
                    </div>
                </div>
            </div>
            <div className={cn(styles.part, styles.maxWeight)}>
                {order.productWeight}
                {t('kg')}
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

export default SearchTableOrderReceiver;

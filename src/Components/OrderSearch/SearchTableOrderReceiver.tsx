import React from 'react';
import styles from '../../../styles/OrderSearch.module.css';
import { Avatar, Button } from '@mui/material';
import cn from 'classnames';
import { IOrder } from '../../interfaces/order';
import ReceiverApplyPopup from './ReceiverApplyPopup';

type IProps = {
    order: IOrder;
};

const SearchTableOrderReceiver: React.FC<IProps> = ({ order }) => {
    const [isPopupOpen, setIsPopupOpen] = React.useState(false);

    const openPopupFunc = () => setIsPopupOpen(true);

    return (
        <div className={styles.itemWrapper}>
            {isPopupOpen && (
                <ReceiverApplyPopup order={order} closePopup={setIsPopupOpen} />
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
                        Rating: <span>4.64</span>
                    </div>
                    <div
                        className={cn(
                            styles.infoItem,
                            styles.infoItemCompleted
                        )}
                    >
                        Completed orders: <span>16</span>
                    </div>
                </div>
            </div>
            <div className={cn(styles.part, styles.fromTo, styles.doubleditem)}>
                <div>
                    <div className={styles.fromToItem}>
                        <span className={styles.prefix}>From:</span>
                        <span>{order.fromLocation ?? '?'}</span>
                    </div>
                    <div className={styles.fromToItem}>
                        <span className={styles.prefix}>To:</span>
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
                        <span className={styles.prefix}>Price:</span>
                        <span>{order.productAmount}$</span>
                    </div>
                    <div className={styles.fromToItem}>
                        <span className={styles.prefix}>Benefit:</span>
                        <span>{order.rewardAmount}$</span>
                    </div>
                </div>
            </div>
            <div className={cn(styles.part, styles.maxWeight)}>
                {order.productWeight}kg
            </div>
            <div className={cn(styles.part)}>
                <Button
                    onClick={openPopupFunc}
                    variant='contained'
                    className={styles.applyBtn}
                >
                    Apply
                </Button>
            </div>
        </div>
    );
};

export default SearchTableOrderReceiver;

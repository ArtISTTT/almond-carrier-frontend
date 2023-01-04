import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styles from '../../../styles/OrderItem.module.css';
import { Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import cn from 'classnames';
import { orderStatus } from '../../interfaces/profile';
import { IOrder } from '../../interfaces/order';

const OrderItem: React.FC<IOrder> = ({
    status,
    productName,
    fromLocation,
    toLocation,
    rewardAmount,
    arrivalDate,
}) => {
    return (
        <div
            className={cn(styles.order, {
                [styles.orderSuccess]: status === orderStatus.success,
                [styles.orderCancelled]: status === orderStatus.cancelled,
            })}
        >
            <div className={styles.orderData}>
                <div className={styles.orderInfo}>
                    <div className={styles.orderTitle}>
                        <ShoppingCartIcon className={styles.orderIcon} />
                        <Typography
                            variant='h1'
                            component='h1'
                            className={styles.orderItem}
                        >
                            {productName}
                        </Typography>
                    </div>
                    <div className={styles.orderDescriptions}>
                        <Typography
                            variant='h3'
                            component='p'
                            className={styles.description}
                        >
                            <span>FROM: </span>
                            {fromLocation}
                        </Typography>
                        <Typography
                            variant='h3'
                            component='p'
                            className={styles.description}
                        >
                            <span>TO: </span>
                            {toLocation}
                        </Typography>
                        <Typography
                            variant='h3'
                            component='p'
                            className={styles.description}
                        >
                            <span>REWARD: </span>
                            {rewardAmount}
                        </Typography>
                        <Typography
                            variant='h3'
                            component='p'
                            className={styles.description}
                        >
                            <span>Arrival date:</span>{' '}
                            {dayjs(arrivalDate).format('DD.MM.YYYY')}
                        </Typography>
                    </div>
                </div>
                <div className={styles.orderDetails}>
                    <Button
                        className={styles.detailsButton}
                        variant='contained'
                        disabled={status === orderStatus.cancelled}
                    >
                        Order
                        <br /> Details
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default OrderItem;

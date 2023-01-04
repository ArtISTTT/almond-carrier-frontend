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
    item,
    from,
    to,
    reward,
    estimatedDate,
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
                            {item}
                        </Typography>
                    </div>
                    <div className={styles.orderDescriptions}>
                        <Typography
                            variant='h3'
                            component='p'
                            className={styles.description}
                        >
                            <span>FROM: </span>
                            {from}
                        </Typography>
                        <Typography
                            variant='h3'
                            component='p'
                            className={styles.description}
                        >
                            <span>TO: </span>
                            {to}
                        </Typography>
                        <Typography
                            variant='h3'
                            component='p'
                            className={styles.description}
                        >
                            <span>REWARD: </span>
                            {reward}
                        </Typography>
                        <Typography
                            variant='h3'
                            component='p'
                            className={styles.description}
                        >
                            <span>Estimated date:</span>{' '}
                            {dayjs(estimatedDate).format('DD.MM.YYYY')}
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

import React from 'react';
import styles from '../../../styles/OrderItem.module.css';
import { Avatar, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import cn from 'classnames';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { orderStatus } from '../../interfaces/profile';
import { IOrder } from '../../interfaces/order';
import OrderPeopleCard from './OrderPeopleCard';
import { convertStatusToText } from '../../helpers/convertStatusToText';
import Link from 'next/link';

const OrderItem: React.FC<IOrder> = ({
    status,
    productName,
    fromLocation,
    toLocation,
    rewardAmount,
    arrivalDate,
    productWeight,
    productAmount,
    receiver,
    carrierMaxWeight,
    carrier,
    id,
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
                        <div className={styles.userBlock}>
                            <Typography
                                className={styles.blockTitle}
                                variant='h4'
                                component='h4'
                            >
                                Carrier
                            </Typography>
                            {carrier?.id ? (
                                <OrderPeopleCard people={carrier} />
                            ) : (
                                <HelpOutlineIcon
                                    sx={{
                                        width: 65,
                                        height: 65,
                                    }}
                                />
                            )}
                        </div>
                        <div className={styles.userBlock}>
                            <Typography
                                className={styles.blockTitle}
                                variant='h4'
                                component='h4'
                            >
                                receiver
                            </Typography>
                            {receiver?.id ? (
                                <OrderPeopleCard people={receiver} />
                            ) : (
                                <HelpOutlineIcon
                                    sx={{
                                        width: 65,
                                        height: 65,
                                    }}
                                />
                            )}
                        </div>
                        <div className={styles.moneyBlock}>
                            <div className={styles.benefitBlock}>
                                <Typography
                                    className={styles.moneyTitle}
                                    variant='h6'
                                    component='h6'
                                >
                                    BENEFIT
                                </Typography>
                                <Typography
                                    className={styles.moneyValue}
                                    variant='h6'
                                    component='p'
                                >
                                    {rewardAmount}RUB
                                </Typography>
                            </div>
                            {productAmount && (
                                <div>
                                    <Typography
                                        className={styles.moneyTitle}
                                        variant='h6'
                                        component='p'
                                    >
                                        PRICE
                                    </Typography>
                                    <Typography
                                        className={styles.moneyValue}
                                        variant='h6'
                                        component='p'
                                    >
                                        {productAmount}RUB
                                    </Typography>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={styles.orderDescriptions}>
                        {productName && (
                            <Typography
                                variant='h3'
                                component='p'
                                className={styles.description}
                            >
                                {productName}
                            </Typography>
                        )}
                        <Typography
                            variant='h3'
                            component='p'
                            className={styles.description}
                        >
                            <span>TO: </span>
                            {toLocation}
                        </Typography>
                        {fromLocation && (
                            <Typography
                                variant='h3'
                                component='p'
                                className={styles.description}
                            >
                                <span>FROM: </span>
                                {fromLocation}
                            </Typography>
                        )}

                        {arrivalDate && (
                            <Typography
                                variant='h3'
                                component='p'
                                className={styles.description}
                            >
                                <span>Flight date:</span>{' '}
                                {dayjs(arrivalDate).format('DD.MM.YYYY')}
                            </Typography>
                        )}
                        {productWeight && (
                            <Typography
                                variant='h3'
                                component='p'
                                className={styles.description}
                            >
                                <span>Weight:</span> {productWeight}
                            </Typography>
                        )}
                    </div>
                </div>
                <div className={styles.orderDetails}>
                    <Button
                        className={styles.detailsButton}
                        variant='contained'
                        disabled={status === orderStatus.cancelled}
                    >
                        <Link href={`/order/${id}`}>
                            Order
                            <br /> Details
                        </Link>
                    </Button>
                    <div>
                        <Typography
                            variant='h3'
                            component='p'
                            className={styles.status}
                        >
                            <span>STATUS: </span>
                            {convertStatusToText(status)}
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderItem;

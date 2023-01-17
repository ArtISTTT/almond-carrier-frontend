import React from 'react';
import styles from 'styles/OrderItem.module.css';
import { Avatar, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import cn from 'classnames';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { OrderStatus } from '../../interfaces/profile';
import { IOrder } from '../../interfaces/order';
import OrderPeopleCard from './OrderPeopleCard';
import { useConvertStatusToText } from '../../redux/hooks/useConvertStatusToText';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import useFormatAmount from 'src/redux/hooks/useFormatAmount';
import { Currency } from 'src/interfaces/settings';

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
    const { t } = useTranslation();
    const formatAmount = useFormatAmount();
    const convertStatus = useConvertStatusToText();

    return (
        <div
            className={cn(styles.order, {
                [styles.orderSuccess]: status === OrderStatus.success,
                [styles.orderCancelled]: status === OrderStatus.cancelled,
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
                                {t('carrier')}
                            </Typography>
                            {carrier?.id ? (
                                <OrderPeopleCard people={carrier} />
                            ) : (
                                <HelpOutlineIcon
                                    sx={{
                                        width: 65,
                                        height: 65,
                                    }}
                                    className={styles.roundIconQuestion}
                                />
                            )}
                        </div>
                        <div className={styles.userBlock}>
                            <Typography
                                className={styles.blockTitle}
                                variant='h4'
                                component='h4'
                            >
                                {t('receiver')}
                            </Typography>
                            {receiver?.id ? (
                                <OrderPeopleCard people={receiver} />
                            ) : (
                                <HelpOutlineIcon
                                    sx={{
                                        width: 65,
                                        height: 65,
                                    }}
                                    className={styles.roundIconQuestion}
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
                                    {t('benefit')}
                                </Typography>
                                <Typography
                                    className={styles.moneyValue}
                                    variant='h6'
                                    component='p'
                                >
                                    {formatAmount(
                                        rewardAmount,
                                        Currency.RUB,
                                        true
                                    )}
                                </Typography>
                            </div>
                            {productAmount && (
                                <div>
                                    <Typography
                                        className={styles.moneyTitle}
                                        variant='h6'
                                        component='p'
                                    >
                                        {t('price')}
                                    </Typography>
                                    <Typography
                                        className={styles.moneyValue}
                                        variant='h6'
                                        component='p'
                                    >
                                        {formatAmount(
                                            productAmount,
                                            Currency.RUB,
                                            true
                                        )}
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
                                className={cn(
                                    styles.description,
                                    styles.productName
                                )}
                            >
                                <span>{t('product')}: </span>
                                {productName}
                            </Typography>
                        )}

                        {/* {arrivalDate && (
                            <Typography
                                variant='h3'
                                component='p'
                                className={styles.description}
                            >
                                <span>{t('flightDate')}:</span>{' '}
                                {dayjs(arrivalDate).format('DD.MM.YYYY')}
                            </Typography>
                        )} */}
                        {productWeight && (
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
                            <span>{t('to')}: </span>
                            {toLocation}
                        </Typography>
                        {fromLocation && (
                            <Typography
                                variant='h3'
                                component='p'
                                className={styles.description}
                            >
                                <span>{t('from')}: </span>
                                {fromLocation}
                            </Typography>
                        )}

                        {arrivalDate && (
                            <Typography
                                variant='h3'
                                component='p'
                                className={styles.description}
                            >
                                <span>{t('flightDate')}:</span>{' '}
                                {arrivalDate.format('DD.MM.YYYY')}
                            </Typography>
                        )}
                        {productWeight && (
                            <Typography
                                variant='h3'
                                component='p'
                                className={styles.description}
                            >
                                <span>{t('weight')}:</span> {productWeight}
                            </Typography>
                        )}
                    </div>
                </div>
                <div className={styles.orderDetails}>
                    <Button
                        className={styles.detailsButton}
                        variant='contained'
                        disabled={status === OrderStatus.cancelled}
                    >
                        <Link href={`/order/${id}`}>
                            {t('orderDetailsButton')}
                        </Link>
                    </Button>
                    <div>
                        <Typography
                            variant='h3'
                            component='p'
                            className={styles.status}
                        >
                            <span>{t('status')}: </span>
                            {convertStatus(status)}
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderItem;

import React from 'react';
import styles from 'styles/OrderItem.module.css';
import { Button, Typography } from '@mui/material';
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
import Tooltip from '@mui/material/Tooltip';
import { LinkBehaviour } from '../Common/LinkBehaviour';
import DetailsLoader from '../DetailsLoader';

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

    const [isDetailsLoading, setIsDetailsLoading] =
        React.useState<boolean>(false);

    const navigateToDetailsLoading = () => setIsDetailsLoading(true);

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
                                    {productAmount
                                        ? formatAmount(
                                              productAmount,
                                              Currency.RUB,
                                              true
                                          )
                                        : t('undefined')}
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div className={styles.orderDescriptions}>
                        <Typography
                            variant='h3'
                            component='p'
                            className={cn(
                                styles.description,
                                styles.productName
                            )}
                        >
                            <span>{t('product')}: </span>
                            {productName ? productName : t('undefined')}
                        </Typography>
                        <Tooltip placement='bottom' title={toLocation}>
                            <Typography
                                variant='h3'
                                component='p'
                                className={styles.description}
                            >
                                <span>{t('to')}: </span>
                                {toLocation}
                            </Typography>
                        </Tooltip>
                        <Tooltip placement='bottom' title={fromLocation}>
                            <Typography
                                variant='h3'
                                component='p'
                                className={styles.description}
                            >
                                <span>{t('from')}: </span>
                                {fromLocation ? fromLocation : t('undefined')}
                            </Typography>
                        </Tooltip>
                        <Typography
                            variant='h3'
                            component='p'
                            className={styles.description}
                        >
                            <span>{t('flightDate')}:</span>{' '}
                            {arrivalDate
                                ? arrivalDate.format('DD.MM.YYYY')
                                : t('undefined')}
                        </Typography>

                        <Typography
                            variant='h3'
                            component='p'
                            className={styles.description}
                        >
                            <span>{t('weight')}:</span>{' '}
                            {productWeight
                                ? `${productWeight} ${t('kg')}`
                                : t('undefined')}
                        </Typography>
                    </div>
                </div>
                <div className={styles.orderDetails}>
                    <div className={styles.detailsBlock}>
                        <Button
                            className={styles.detailsButton}
                            variant='contained'
                            disabled={status === OrderStatus.cancelled}
                        >
                            {!isDetailsLoading ? (
                                <LinkBehaviour
                                    onClick={navigateToDetailsLoading}
                                    href={`/order/${id}`}
                                >
                                    {t('orderDetailsButton')}
                                </LinkBehaviour>
                            ) : (
                                <DetailsLoader />
                            )}
                        </Button>
                        <div>
                            <Typography
                                variant='h3'
                                component='p'
                                className={styles.status}
                            >
                                {convertStatus(status)}
                            </Typography>
                        </div>
                    </div>
                    <div className={styles.moneyBlockNew}>
                        <div className={styles.priceBlock}>
                            <Typography
                                className={styles.moneyTitle}
                                variant='h6'
                                component='p'
                            >
                                {t('price')}:
                            </Typography>
                            <Typography
                                className={styles.moneyValue}
                                variant='h6'
                                component='p'
                            >
                                {productAmount
                                    ? formatAmount(
                                          productAmount,
                                          Currency.RUB,
                                          true
                                      )
                                    : t('undefined')}
                            </Typography>
                        </div>

                        <div className={styles.benefitBlock}>
                            <Typography
                                className={styles.moneyTitle}
                                variant='h6'
                                component='h6'
                            >
                                {t('benefit')}:
                            </Typography>
                            <Typography
                                className={styles.moneyValue}
                                variant='h6'
                                component='p'
                            >
                                {formatAmount(rewardAmount, Currency.RUB, true)}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderItem;

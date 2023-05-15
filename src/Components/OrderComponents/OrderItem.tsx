import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Button, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import cn from 'classnames';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LoaderColors } from 'src/interfaces/loader';
import { navigateTo } from 'src/interfaces/navigate';
import { Currency } from 'src/interfaces/settings';
import { useAppSelector } from 'src/redux/hooks';
import useFormatAmount from 'src/redux/hooks/useFormatAmount';
import { selectUser } from 'src/redux/selectors/user';
import styles from 'styles/OrderItem.module.css';
import { IOrder } from '../../interfaces/order';
import { OrderStatus } from '../../interfaces/profile';
import { useConvertStatusToText } from '../../redux/hooks/useConvertStatusToText';
import CircleLoader from '../Loaders/CircleLoader';
import { ViewType } from '../OrderPage/OrderInputItem';
import OrderPeopleCard from './OrderPeopleCard';

type IProps = {
    order: IOrder;
    isOrderFromUserPage?: boolean;
    setApplyedOrder?: React.Dispatch<React.SetStateAction<IOrder | undefined>>;
};

const OrderItem: React.FC<IProps> = ({
    order,
    isOrderFromUserPage,
    setApplyedOrder,
}) => {
    const { t } = useTranslation();
    const formatAmount = useFormatAmount();
    const convertStatus = useConvertStatusToText();
    const user = useAppSelector(selectUser);
    const router = useRouter();

    const [isDetailsLoading, setIsDetailsLoading] =
        React.useState<boolean>(false);

    const ourId = useAppSelector(({ user }) => user.data?.id);

    const viewType = React.useMemo(
        () =>
            order.receiver?.id === user.id
                ? ViewType.receiver
                : ViewType.carrier,
        [order.receiver?.id, user.id]
    );

    const displayOrderStatus = React.useMemo(() => {
        if (viewType === ViewType.carrier) {
            return order.status;
        }

        if (
            [OrderStatus.itemRecieved, OrderStatus.awaitingPayout].includes(
                order.status
            )
        ) {
            return OrderStatus.success;
        }

        return order.status;
    }, [order.status, viewType]);

    const navigateToUserPage = (id: string): void => {
        router.push({
            pathname: navigateTo.USER,
            query: { userId: id },
        });
    };

    const navigateToCarrier = () => {
        if (order.carrier) {
            navigateToUserPage(order.carrier.id);
        }
    };

    const navigateToReceiver = () => {
        if (order.receiver) {
            navigateToUserPage(order.receiver.id);
        }
    };

    const applyUserOrder = () => {
        if (order && setApplyedOrder) {
            setApplyedOrder(order);
        }
    };

    const disableButton = () => {
        setIsDetailsLoading(true);
    };

    return (
        <div
            className={cn(styles.order, {
                [styles.orderSuccess]:
                    displayOrderStatus === OrderStatus.success,
                [styles.orderCancelled]:
                    displayOrderStatus === OrderStatus.cancelled,
            })}
        >
            <div className={styles.orderData}>
                <div className={styles.orderInfo}>
                    <div className={styles.orderTitle}>
                        <div
                            className={cn(styles.userBlock, {
                                [styles.userBlockHover]: order.carrier,
                            })}
                            onClick={navigateToCarrier}
                        >
                            <Typography
                                className={styles.blockTitle}
                                variant='h4'
                                component='h4'
                            >
                                {t('carrier')}
                            </Typography>
                            {order.carrier?.id ? (
                                <OrderPeopleCard people={order.carrier} />
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
                        <div
                            className={cn(styles.userBlock, {
                                [styles.userBlockHover]: order.receiver,
                            })}
                            onClick={navigateToReceiver}
                        >
                            <Typography
                                className={styles.blockTitle}
                                variant='h4'
                                component='h4'
                            >
                                {t('receiver')}
                            </Typography>
                            {order.receiver?.id ? (
                                <OrderPeopleCard people={order.receiver} />
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
                                        order.rewardAmount,
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
                                    {order.productAmount !== undefined
                                        ? formatAmount(
                                              order.productAmount,
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
                            {order.productName
                                ? order.productName
                                : t('undefined')}
                        </Typography>
                        <Tooltip placement='bottom' title={order.toLocation}>
                            <Typography
                                variant='h3'
                                component='p'
                                className={styles.description}
                            >
                                <span>{t('to')}: </span>
                                {order.toLocation}
                            </Typography>
                        </Tooltip>
                        <Tooltip placement='bottom' title={order.fromLocation}>
                            <Typography
                                variant='h3'
                                component='p'
                                className={styles.description}
                            >
                                <span>{t('from')}: </span>
                                {order.fromLocation
                                    ? order.fromLocation
                                    : t('undefined')}
                            </Typography>
                        </Tooltip>
                        <Typography
                            variant='h3'
                            component='p'
                            className={styles.description}
                        >
                            <span>{t('flightDate')}:</span>{' '}
                            {order.arrivalDate
                                ? order.arrivalDate.format('DD.MM.YYYY')
                                : t('undefined')}
                        </Typography>

                        <Typography
                            variant='h3'
                            component='p'
                            className={styles.description}
                        >
                            <span>{t('weight')}:</span>{' '}
                            {order.productWeight
                                ? `${order.productWeight} ${t('kg')}`
                                : t('undefined')}
                        </Typography>
                    </div>
                </div>
                <div className={styles.orderDetails}>
                    <div className={styles.detailsBlock}>
                        {isOrderFromUserPage &&
                        ((order.receiver && !order.carrier) ||
                            (order.carrier && !order.receiver)) ? (
                            <motion.div
                                whileHover={{ scale: 1.07 }}
                                whileTap={{ scale: 0.93 }}
                            >
                                <Button
                                    className={styles.detailsButton}
                                    variant='contained'
                                    onClick={applyUserOrder}
                                    disabled={
                                        order.status === OrderStatus.cancelled
                                    }
                                >
                                    {isDetailsLoading ? (
                                        <CircleLoader
                                            color={LoaderColors.SECONDARY}
                                        />
                                    ) : (
                                        <span
                                            className={styles.detailsButtonLink}
                                        >
                                            {t('apply')}
                                        </span>
                                    )}
                                </Button>
                            </motion.div>
                        ) : (
                            (ourId === order.carrier?.id ||
                                ourId === order.receiver?.id) && (
                                <Link prefetch href={`/order/${order.id}`}>
                                    <motion.div
                                        whileHover={{ scale: 1.07 }}
                                        whileTap={{ scale: 0.93 }}
                                    >
                                        <Button
                                            className={styles.detailsButton}
                                            variant='contained'
                                            onClick={disableButton}
                                            disabled={
                                                isDetailsLoading ||
                                                order.status ===
                                                    OrderStatus.cancelled
                                            }
                                        >
                                            <span
                                                className={
                                                    styles.detailsButtonLink
                                                }
                                            >
                                                {t('detailsButton')}
                                            </span>
                                        </Button>
                                    </motion.div>
                                </Link>
                            )
                        )}
                        <div>
                            <Typography
                                variant='h3'
                                component='p'
                                className={styles.status}
                            >
                                {convertStatus(displayOrderStatus)}
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
                                {order.productAmount !== undefined
                                    ? formatAmount(
                                          order.productAmount,
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
                                {formatAmount(
                                    order.rewardAmount,
                                    Currency.RUB,
                                    true
                                )}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderItem;

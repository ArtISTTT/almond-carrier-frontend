import React from 'react';
import styles from '../../styles/Receiver.module.css';
import { Button, Container, Typography } from '@mui/material';
import cn from 'classnames';
import CarrierLayout from '../../src/Components/Layouts/Carrier';
import OrderItem from '../../src/Components/profile/OrderItem';
import LittleOrderItem from '../../src/Components/profile/LittleOrderItem';
import Popup from '../../src/Components/profile/Popup';
import { IOrder, orderStatus } from '../../src/interfaces/profile';
import dayjs from 'dayjs';

const littleOrders = [
    { to: 'Barnaul', benefit: 40 },
    { to: 'Barnaul', benefit: 40 },
    { to: 'Barnaul', benefit: 40 },
    { to: 'Barnaul', benefit: 40 },
    { to: 'Barnaul', benefit: 40 },
    { to: 'Barnaul', benefit: 40 },
];

const orders: IOrder[] = [
    {
        status: orderStatus.awaitingDelivery,
        item: 'Nuts',
        from: 'Moscow',
        to: 'Antalya',
        reward: 500,
        estimatedDate: dayjs('2019-01-25'),
    },
    {
        status: orderStatus.awaitingDelivery,
        item: 'Nuts',
        from: 'Moscow',
        to: 'Antalya',
        reward: 500,
        estimatedDate: dayjs('2019-01-25'),
    },
    {
        status: orderStatus.awaitingDelivery,
        item: 'Nuts',
        from: 'Moscow',
        to: 'Antalya',
        reward: 500,
        estimatedDate: dayjs('2019-01-25'),
    },
];

const ReceiverPage: React.FC = () => {
    const [isPopupOpen, setIsPopupOpen] = React.useState<boolean>(false);

    const openPopup = () => setIsPopupOpen(prev => !prev);

    const addNewOrder = (order: IOrder) => orders.push(order);

    return (
        <>
            <div
                className={cn({
                    [styles.popupIsOpen]: isPopupOpen,
                    [styles.popupIsClosed]: !isPopupOpen,
                })}
            >
                <Popup
                    addNewOrder={addNewOrder}
                    setIsPopupOpen={setIsPopupOpen}
                />
            </div>
            <CarrierLayout>
                <Container maxWidth={false}>
                    <Typography
                        className={styles.receiverTitle}
                        variant='h2'
                        component='h2'
                    >
                        Live orders
                    </Typography>
                    <div className={styles.receiverContent}>
                        <div className={styles.ordersWindow}>
                            <div className={styles.ordersWrapper}>
                                {orders?.map((order, i) => (
                                    <OrderItem
                                        key={i}
                                        status={order.status}
                                        item={order.item}
                                        from={order.from}
                                        to={order.to}
                                        estimatedDate={order.estimatedDate}
                                        reward={order.reward}
                                    />
                                ))}
                            </div>
                            <Button
                                onClick={openPopup}
                                className={styles.newOrderButton}
                                variant='contained'
                            >
                                CREATE NEW ORDER
                            </Button>
                        </div>
                        <div className={styles.currentlyWindow}>
                            <div className={styles.currentlyWindowContainer}>
                                <Typography
                                    className={styles.currentlyTitle}
                                    variant='h4'
                                    component='h4'
                                >
                                    Currently looking for a carrier
                                </Typography>
                                <div className={styles.littleOrdersContainer}>
                                    {littleOrders.map((littleOrder, i) => (
                                        <LittleOrderItem
                                            key={i}
                                            benefit={littleOrder.benefit}
                                            to={littleOrder.to}
                                        />
                                    ))}
                                </div>
                                <Button
                                    className={styles.showMoreButton}
                                    variant='contained'
                                >
                                    show more
                                </Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </CarrierLayout>
        </>
    );
};

export default ReceiverPage;

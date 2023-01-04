import React from 'react';
import styles from '../../styles/Receiver.module.css';
import { Button, Container, Typography } from '@mui/material';
import cn from 'classnames';
import CarrierLayout from '../../src/Components/Layouts/Carrier';
import OrderItem from '../../src/Components/orders/OrderItem';
import RecentlyCreatedOrder from '../../src/Components/orders/RecentlyCreatedOrder';
import Popup from '../../src/Components/orders/Popup';
import { IOrder, orderStatus } from '../../src/interfaces/profile';
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';

const recentlyCreatedOrders = [
    { to: 'Barnaul', benefit: 40, id: 1 },
    { to: 'Barnaul', benefit: 40, id: 2 },
    { to: 'Barnaul', benefit: 40, id: 3 },
    { to: 'Barnaul', benefit: 40, id: 4 },
    { to: 'Barnaul', benefit: 40, id: 5 },
];

const orders: IOrder[] = [
    {
        id: 1,
        status: orderStatus.awaitingDelivery,
        item: 'Nuts',
        from: 'Moscow',
        to: 'Antalya',
        reward: 500,
        estimatedDate: dayjs('2019-01-25'),
    },
    {
        id: 2,
        status: orderStatus.awaitingDelivery,
        item: 'Nuts',
        from: 'Moscow',
        to: 'Antalya',
        reward: 500,
        estimatedDate: dayjs('2019-01-25'),
    },
    {
        id: 3,
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

    const togglePopup = () => setIsPopupOpen(prev => !prev);

    const addNewOrder = (order: IOrder) => orders.push(order);

    return (
        <>
            <div
                className={cn({
                    [styles.popupIsOpen]: isPopupOpen,
                    [styles.popupIsClosed]: !isPopupOpen,
                })}
            >
                <Popup addNewOrder={addNewOrder} togglePopup={togglePopup} />
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
                                {orders?.map(order => (
                                    <OrderItem
                                        key={order.id}
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
                                onClick={togglePopup}
                                className={styles.newOrderButton}
                                variant='contained'
                            >
                                <AddIcon sx={{ fontSize: 22 }} />
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
                                    {recentlyCreatedOrders.map(order => (
                                        <RecentlyCreatedOrder
                                            key={order.id}
                                            benefit={order.benefit}
                                            to={order.to}
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

import React, { useEffect } from 'react';
import styles from '../../../styles/Dashboard.module.css';
import { Button, Container, Typography } from '@mui/material';
import cn from 'classnames';
import AddIcon from '@mui/icons-material/Add';
import ReceiverAddingPopup from '../orders/ReceiverAddingPopup';
import CarrierLayout from '../Layouts/Carrier';
import OrderItem from '../orders/OrderItem';
import RecentlyCreatedOrder from '../orders/RecentlyCreatedOrder';
import CarrierAddingPopup from '../orders/CarrierAddingPopup';
import { useSelector } from 'react-redux';
import { selectMyLiveOrders } from '../../redux/selectors/orders';
import { useLoadOwnOrders } from '../../redux/hooks/useLoadOwnOrders';
import OrderLoader from '../OrderLoader';
import EmptyOrdersBlock from '../EmptyOrdersBlock';

const recentlyCreatedOrders = [
    { to: 'Barnaul', benefit: 40, id: 1 },
    { to: 'Barnaul', benefit: 40, id: 2 },
    { to: 'Barnaul', benefit: 40, id: 3 },
    { to: 'Barnaul', benefit: 40, id: 4 },
    { to: 'Barnaul', benefit: 40, id: 5 },
];

enum PopupType {
    none,
    carrier,
    reciever,
}

const Dashboard: React.FC = () => {
    const orders = useSelector(selectMyLiveOrders);
    const [openedPopup, setOpenedPopup] = React.useState<PopupType>(
        PopupType.none
    );

    const { reload, isLoading, error } = useLoadOwnOrders();

    useEffect(() => {
        reload();
    }, []);

    const toggleCarrierPopup = () =>
        setOpenedPopup(prev => {
            if (prev === PopupType.none) {
                return PopupType.carrier;
            }

            return PopupType.none;
        });

    const toggleReceiverPopup = () =>
        setOpenedPopup(prev => {
            if (prev === PopupType.none) {
                return PopupType.reciever;
            }

            return PopupType.none;
        });

    return (
        <>
            <div
                className={cn({
                    [styles.popupIsOpen]: openedPopup !== PopupType.none,
                    [styles.popupIsClosed]: openedPopup === PopupType.none,
                })}
            >
                {openedPopup === PopupType.reciever && (
                    <ReceiverAddingPopup
                        togglePopup={toggleReceiverPopup}
                        reload={reload}
                    />
                )}
                {openedPopup === PopupType.carrier && (
                    <CarrierAddingPopup
                        togglePopup={toggleCarrierPopup}
                        reload={reload}
                    />
                )}
            </div>
            <CarrierLayout>
                <Container
                    maxWidth={false}
                    className={styles.dashboardContainer}
                >
                    <Typography
                        className={styles.receiverTitle}
                        variant='h2'
                        component='h2'
                    >
                        Live orders
                    </Typography>
                    <div className={styles.receiverContent}>
                        {isLoading ? (
                            <OrderLoader />
                        ) : (
                            <div className={styles.ordersWindow}>
                                <div
                                    className={cn(styles.ordersWrapper, {
                                        [styles.emptyOrders]:
                                            orders.length === 0,
                                    })}
                                >
                                    {orders?.map(order => (
                                        <OrderItem key={order.id} {...order} />
                                    ))}
                                    {orders.length === 0 && (
                                        <EmptyOrdersBlock />
                                    )}
                                </div>
                                <div className={styles.newOrderButtons}>
                                    <Button
                                        onClick={toggleReceiverPopup}
                                        className={styles.newOrderButton}
                                        variant='contained'
                                    >
                                        <AddIcon sx={{ fontSize: 22 }} />
                                        Order new item
                                    </Button>
                                    <Button
                                        onClick={toggleCarrierPopup}
                                        className={cn(
                                            styles.newOrderButton,
                                            styles.sending
                                        )}
                                        variant='contained'
                                    >
                                        <AddIcon sx={{ fontSize: 22 }} />
                                        Send new item
                                    </Button>
                                </div>
                            </div>
                        )}
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

export default Dashboard;

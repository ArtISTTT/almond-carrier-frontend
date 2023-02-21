import React, { useEffect } from 'react';
import styles from '../../../styles/Dashboard.module.css';
import { Button, Container, Typography } from '@mui/material';
import cn from 'classnames';
import AddIcon from '@mui/icons-material/Add';
import ReceiverAddingPopup from 'src/Components/OrderComponents/ReceiverAddingPopup';
import CarrierLayout from '../Layouts/Carrier';
import OrderItem from 'src/Components/OrderComponents/OrderItem';
import CarrierAddingPopup from '../OrderComponents/CarrierAddingPopup';
import { useSelector } from 'react-redux';
import { selectMyLiveOrders } from '../../redux/selectors/orders';
import { useLoadOwnOrders } from '../../redux/hooks/useLoadOwnOrders';
import EmptyOrdersBlock from '../EmptyComponents/Empty';
import { useTranslation } from 'next-i18next';
import { toggleHtmlScroll } from '../../helpers/toggleHtmlScroll';
import CircleLoader from '../Loaders/CircleLoader';
import { LoaderColors } from 'src/interfaces/loader';

enum PopupType {
    none,
    carrier,
    reciever,
}

const Dashboard: React.FC = () => {
    const orders = useSelector(selectMyLiveOrders);
    const { t } = useTranslation();
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
                toggleHtmlScroll(true);
                return PopupType.carrier;
            }

            toggleHtmlScroll(false);
            return PopupType.none;
        });

    const toggleReceiverPopup = () =>
        setOpenedPopup(prev => {
            if (prev === PopupType.none) {
                toggleHtmlScroll(true);
                return PopupType.reciever;
            }

            toggleHtmlScroll(false);
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
                        {t('liveOrders')}
                    </Typography>
                    <div className={styles.receiverContent}>
                        {isLoading ? (
                            <CircleLoader color={LoaderColors.PRIMARY} />
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
                                        {t('orderItem')}
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
                                        {t('sendItem')}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </Container>
            </CarrierLayout>
        </>
    );
};

export default Dashboard;

import AddIcon from '@mui/icons-material/Add';
import { Button, Container, Pagination, Typography } from '@mui/material';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import OrderItem from 'src/Components/OrderComponents/OrderItem';
import ReceiverAddingPopup from 'src/Components/OrderComponents/ReceiverAddingPopup';
import { LoaderColors } from 'src/interfaces/loader';
import { useGetCurrentPageOrders } from 'src/redux/hooks/useGetCurrentPage';
import styles from '../../../styles/Dashboard.module.css';
import { toggleHtmlScroll } from '../../helpers/toggleHtmlScroll';
import { useLoadOwnOrders } from '../../redux/hooks/useLoadOwnOrders';
import { selectMyLiveOrders } from '../../redux/selectors/orders';
import EmptyBlock from '../EmptyComponents/EmptyOrderBlock';
import UserLayout from '../Layouts/User';
import CircleLoader from '../Loaders/CircleLoader';
import CarrierAddingPopup from '../OrderComponents/CarrierAddingPopup';
import {motion} from "framer-motion"

enum PopupType {
    none,
    carrier,
    reciever,
}

const Dashboard: React.FC = () => {
    const orders = useSelector(selectMyLiveOrders);
    const { t } = useTranslation();
    const [page, setPage] = React.useState<number>(1);
    const [openedPopup, setOpenedPopup] = React.useState<PopupType>(
        PopupType.none
    );

    const { reload, isLoading, error } = useLoadOwnOrders();
    const thisPageOrders = useGetCurrentPageOrders({ orders, page });

    useEffect(() => {
        reload();
    }, []);

    const totalCountPages = React.useMemo(() => {
        return Math.ceil(orders.length / 4);
    }, [orders]);

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

    const handleChangePagination = async (
        _: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value);
    };

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
            <UserLayout>
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
                                    {thisPageOrders?.map(order => (
                                        <OrderItem
                                            key={order?.id}
                                            order={order}
                                        />
                                    ))}
                                    {orders.length === 0 && <EmptyBlock />}
                                </div>
                                <div className={styles.newOrderButtonsWrapper}>
                                    {totalCountPages > 1 && (
                                        <Pagination
                                            className={styles.pagination}
                                            count={totalCountPages}
                                            variant='outlined'
                                            color='primary'
                                            onChange={handleChangePagination}
                                        />
                                    )}
                                    <div className={styles.newOrderButtons}>
                                        <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
                                            <Button
                                                onClick={toggleReceiverPopup}
                                                className={styles.newOrderButton}
                                                variant='contained'
                                            >
                                                <AddIcon sx={{ fontSize: 22 }} />
                                                {t('orderItem')}
                                            </Button>
                                        </motion.div>
                                        <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
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
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </Container>
            </UserLayout>
        </>
    );
};

export default Dashboard;

import React, { useContext } from 'react';
import cn from 'classnames';
import { useConvertStatusToText } from '../../redux/hooks/useConvertStatusToText';
import styles from '../../../styles/OrderPage.module.css';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useTranslation } from 'react-i18next';
import { IOrderFull } from '../../interfaces/order';
import { OrderStatus } from 'src/interfaces/profile';
import { ViewType } from './OrderInputItem';
import { OpenAlertContext } from '../Layouts/Snackbar';

type IProps = {
    payoutRef: React.MutableRefObject<HTMLDivElement | null>;
    order: IOrderFull;
    viewType: ViewType;
    setIsReviewBlockOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsMySentReviewBlockOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsPersonReviewBlockOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const OrderDetails: React.FC<IProps> = ({
    payoutRef,
    order,
    setIsReviewBlockOpen,
    setIsMySentReviewBlockOpen,
    setIsPersonReviewBlockOpen,
    viewType,
}) => {
    const { t } = useTranslation();
    const statusToText = useConvertStatusToText();
    const { triggerOpen } = useContext(OpenAlertContext);

    const openReviewBlock = () => setIsReviewBlockOpen(true);
    const operPersonReviewBlock = () => {
        setIsMySentReviewBlockOpen(false);
        setIsPersonReviewBlockOpen(true);
    };
    const openMySentReviewBlock = () => {
        setIsPersonReviewBlockOpen(false);
        setIsMySentReviewBlockOpen(true);
    };

    const copyId = () => {
        navigator.clipboard.writeText(order.id);
        triggerOpen({
            severity: 'info',
            text: t('copied'),
        });
    };

    const paymentScroll = () => {
        payoutRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const orderStatusSuccessForPerson = React.useMemo(() => {
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

    return (
        <div className={styles.orderDetails}>
            <div className={styles.orderDetailsMain}>
                <div className={styles.orderDetailsTitle}>
                    {t('orderDetails')}
                </div>
                <div className={styles.detailsButtons}>
                    <span
                        className={cn(styles.orderStatus, {
                            [styles.statusInProcess]:
                                orderStatusSuccessForPerson !==
                                    OrderStatus.success &&
                                orderStatusSuccessForPerson !==
                                    OrderStatus.cancelled,

                            [styles.statusSuccess]:
                                orderStatusSuccessForPerson ===
                                    OrderStatus.success ||
                                orderStatusSuccessForPerson ===
                                    OrderStatus.itemRecieved ||
                                orderStatusSuccessForPerson ===
                                    OrderStatus.awaitingPayout,
                            [styles.statusCancelled]:
                                orderStatusSuccessForPerson ===
                                OrderStatus.cancelled,
                        })}
                    >
                        {statusToText(orderStatusSuccessForPerson)}
                    </span>

                    {order.myReview
                        ? [
                              OrderStatus.itemRecieved,
                              OrderStatus.awaitingPayout,
                              OrderStatus.success,
                          ].includes(order.status) && (
                              <span
                                  onClick={openMySentReviewBlock}
                                  className={styles.feedBackSentBlock}
                              >
                                  {t('myFeedback')}
                              </span>
                          )
                        : [
                              OrderStatus.itemRecieved,
                              OrderStatus.awaitingPayout,
                              OrderStatus.success,
                          ].includes(order.status) && (
                              <span
                                  className={styles.openReviewPopupButton}
                                  onClick={openReviewBlock}
                              >
                                  {t('leaveFeedback')}
                              </span>
                          )}
                    {order.partnerReview &&
                        [
                            OrderStatus.itemRecieved,
                            OrderStatus.awaitingPayout,
                            OrderStatus.success,
                        ].includes(order.status) && (
                            <span
                                onClick={operPersonReviewBlock}
                                className={styles.partnerFeedBack}
                            >
                                {viewType === ViewType.receiver
                                    ? t('partnerCarrierReview')
                                    : t('partnerReceiverReview')}
                            </span>
                        )}
                </div>
                {order.status === OrderStatus.itemRecieved &&
                    viewType === ViewType.carrier && (
                        <div
                            onClick={paymentScroll}
                            className={styles.reminerBlock}
                        >
                            <ReceiptIcon />
                            <span>
                                {t('toReceivePaymentProvideYourDetails')}
                            </span>
                        </div>
                    )}
            </div>
            <div className={styles.orderDetailsInfo}>
                <div className={styles.infoLeft}>
                    <p>{t('orderID')}:</p>
                    <p>{t('createdTime')}:</p>
                </div>
                <div className={styles.infoRight}>
                    <div className={styles.infoRightId}>
                        <span>{order.id}</span>
                        <div>
                            <ContentCopyIcon
                                onClick={copyId}
                                fontSize='small'
                            />
                        </div>
                    </div>
                    <div className={styles.createdDate}>
                        <div>{order.createdDate.format('hh:mm')}</div>
                        <div>{order.createdDate.format('MM.D.YYYY')}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;

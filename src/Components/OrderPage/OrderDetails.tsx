import React from 'react';
import cn from 'classnames';
import { useConvertStatusToText } from '../../redux/hooks/useConvertStatusToText';
import styles from '../../../styles/OrderPage.module.css';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useTranslation } from 'react-i18next';
import { IOrderFull } from '../../interfaces/order';
import { OrderStatus } from 'src/interfaces/profile';
import Button from '@mui/material/Button';

type IProps = {
    order: IOrderFull;
    isReviewBlockOpen: boolean;
    setIsReviewBlockOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const OrderDetails: React.FC<IProps> = ({
    order,
    setIsReviewBlockOpen,
    isReviewBlockOpen,
}) => {
    const { t } = useTranslation();
    const statusToText = useConvertStatusToText();

    const openReviewBlock = () => setIsReviewBlockOpen(true);

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
                                order.status !== OrderStatus.success &&
                                order.status !== OrderStatus.cancelled,
                            [styles.statusSuccess]:
                                order.status === OrderStatus.success,
                            [styles.statusCancelled]:
                                order.status === OrderStatus.cancelled,
                        })}
                    >
                        {statusToText(order.status)}
                    </span>
                    {!isReviewBlockOpen && (
                        <Button
                            className={styles.openReviewPopupButton}
                            variant='contained'
                            onClick={openReviewBlock}
                        >
                            Open review
                        </Button>
                    )}
                </div>
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
                            <ContentCopyIcon fontSize='small' />
                        </div>
                    </div>
                    <div>10.12.2024 13:43:12</div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;

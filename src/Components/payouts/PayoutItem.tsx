import DoneIcon from '@mui/icons-material/Done';
import LoopIcon from '@mui/icons-material/Loop';
import cn from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { IPayout } from 'src/interfaces/order';
import { OrderStatus } from 'src/interfaces/profile';
import { Currency } from 'src/interfaces/settings';
import useFormatAmount from 'src/redux/hooks/useFormatAmount';
import styles from '../../../styles/Payments.module.css';

const PayoutItem: React.FC<IPayout> = ({
    id,
    completedDate,
    productName,
    rewardAmount,
    bank,
    phoneNumber,
    status,
}) => {
    const formatAmount = useFormatAmount();
    const router = useRouter();
    const { t } = useTranslation();

    const goToOrderDetails = () => router.push(`/order/${id}`);

    return (
        <div className={styles.payoutItemWrapper}>
            <div onClick={goToOrderDetails} className={styles.payoutItemData}>
                {productName}
            </div>
            <div className={styles.payoutItemData}>{completedDate}</div>
            <div className={styles.payoutItemData}>{bank}</div>
            <div className={styles.payoutItemData}>{phoneNumber}</div>
            <div
                className={cn(styles.payoutItemData, styles.payoutStatus, {
                    [styles.payoutStatusAwait]:
                        status === OrderStatus.awaitingPayout,
                    [styles.payoutStatusSuccess]:
                        status === OrderStatus.success,
                })}
            >
                {status === OrderStatus.success ? (
                    <>
                        <DoneIcon />
                        {t('paidOut')}
                    </>
                ) : (
                    <>
                        <LoopIcon />
                        {t('payoutInProcess')}
                    </>
                )}
            </div>
            <div className={styles.payoutItemData}>
                {formatAmount(rewardAmount, Currency.RUB, true)}
            </div>
        </div>
    );
};

export default PayoutItem;

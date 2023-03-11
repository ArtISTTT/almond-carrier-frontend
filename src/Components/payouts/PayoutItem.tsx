import DoneIcon from '@mui/icons-material/Done';
import LoopIcon from '@mui/icons-material/Loop';
import cn from 'classnames';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { IPayout } from 'src/interfaces/order';
import { OrderStatus } from 'src/interfaces/profile';
import { Currency } from 'src/interfaces/settings';
import useFormatAmount from 'src/redux/hooks/useFormatAmount';
import { useGetBanks } from 'src/redux/hooks/useGetBanks';
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
    const banks = useGetBanks();
    const router = useRouter();
    const { t } = useTranslation();

    const payoutDate = dayjs(completedDate).format('DD.MM.YYYY');
    const payoutBank = banks.find(payoutBank => payoutBank.value === bank);
    const goToOrderDetails = () => router.push(`/order/${id}`);

    return (
        <div className={styles.payoutItemWrapper}>
            <div onClick={goToOrderDetails} className={styles.payoutItemData}>
                {productName}
            </div>
            <div className={styles.payoutItemData}>{payoutDate}</div>
            <div className={styles.payoutItemData}>{payoutBank?.text}</div>
            <div className={styles.payoutItemData}>{phoneNumber}</div>
            <div
                className={cn(styles.payoutItemData, styles.payoutStatus, {
                    [styles.payoutStatusAwait]:
                        status === OrderStatus.awaitingPayout,
                    [styles.payoutStatusSuccess]:
                        status === OrderStatus.success,
                })}
            >
                {status === OrderStatus.success ? <DoneIcon /> : <LoopIcon />}
                <span>{t(status)}</span>
            </div>
            <div className={styles.payoutItemData}>
                {formatAmount(rewardAmount, Currency.RUB, true)}
            </div>
        </div>
    );
};

export default PayoutItem;

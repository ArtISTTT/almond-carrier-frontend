import React from 'react';
import { useTranslation } from 'react-i18next';
import { IPayout } from 'src/interfaces/order';
import styles from '../../../styles/Payments.module.css';
import PayoutItem from './PayoutItem';

const payoutsHeaders = [
    'orderNoun',
    'completionDate',
    'bank',
    'phoneNumber',
    'status',
    'benefit',
];

const payoutsHeadersMobile = [
    'orderNoun',
    'completionDate',
    'bank',
    'phoneNumber',
    'status',
    'benefit',
];

interface IProps {
    payouts: IPayout[];
}

const PayoutsTable: React.FC<IProps> = ({ payouts }) => {
    const { t } = useTranslation();

    return (
        <>
            <div className={styles.paymentHeaders}>
                {payoutsHeaders.map(item => (
                    <div className={styles.paymentHeader} key={item}>
                        {t(item)}
                    </div>
                ))}
            </div>
            {payouts.map(payout => (
                <PayoutItem key={payout.id} {...payout} />
            ))}
        </>
    );
};

export default PayoutsTable;

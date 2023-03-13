import Image, { StaticImageData } from 'next/image';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { OrderStatus } from 'src/interfaces/profile';
import { Banks } from 'src/interfaces/user';
import styles from '../../../styles/OrderPage.module.css';
import { ViewType } from './OrderInputItem';

interface IProps {
    bank?: { value: Banks; text: string; image: StaticImageData };
    status: OrderStatus;
    viewType: ViewType;
    phoneNumer: string;
}

const OrderPayoutInfoBlock: React.FC<IProps> = ({
    bank,
    phoneNumer,
    status,
    viewType,
}) => {
    const { t } = useTranslation();

    if (
        viewType === ViewType.carrier &&
        status === OrderStatus.awaitingPayout
    ) {
        return (
            <div className={styles.payoutWrapper}>
                <div className={styles.payoutTitle}>
                    {t('yourPayoutDetails')}
                </div>
                <div className={styles.payoutItems}>
                    <div className={styles.payoutItem}>
                        {' '}
                        {bank?.image && (
                            <Image
                                className={styles.payoutImage}
                                src={bank.image}
                                alt=''
                            />
                        )}
                        {bank?.text}
                    </div>
                    <div className={styles.payoutItem}>{phoneNumer}</div>
                </div>
            </div>
        );
    }

    return <></>;
};

export default OrderPayoutInfoBlock;

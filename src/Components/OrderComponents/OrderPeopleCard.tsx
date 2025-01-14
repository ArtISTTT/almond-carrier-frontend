import React from 'react';
import { Avatar, Typography } from '@mui/material';
import styles from 'styles/OrderItem.module.css';
import { useTranslation } from 'react-i18next';

interface IProps {
    people: {
        id: string;
        avatar?: string;
        rating?: number;
        firstName: string;
        lastName: string;
    };
}

const OrderPeopleCard: React.FC<IProps> = ({ people }) => {
    const { t } = useTranslation();

    return (
        <div className={styles.carrierCard}>
            <Avatar
                sx={{
                    width: 65,
                    height: 65,
                    cursor: 'pointer',
                }}
                src={people.avatar}
                className={styles.roundIcon}
            />
            <div className={styles.info}>
                <Typography className={styles.name} variant='h5' component='h5'>
                    {people.firstName} {people.lastName}
                </Typography>
                <Typography
                    className={styles.rating}
                    variant='h6'
                    component='h6'
                >
                    {t('rating')}: <span>{people.rating ?? '-'}</span>
                </Typography>
                {/* <Typography
                    className={styles.completedOrders}
                    variant='h6'
                    component='h6'
                >
                    {t('completedOrders')}: <span>12</span>
                </Typography> */}
            </div>
        </div>
    );
};

export default OrderPeopleCard;

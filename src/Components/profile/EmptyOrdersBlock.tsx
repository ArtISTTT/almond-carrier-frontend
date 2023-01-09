import React from 'react';
import styles from '../../../styles/EmptyOrders.module.css';
import { Typography } from '@mui/material';

const EmptyOrdersBlock = () => {
    return (
        <div className={styles.emptyText}>
            <Typography
                className={styles.firstText}
                variant='h4'
                component='h4'
            >
                You don't have any orders yet.
            </Typography>
            <Typography
                className={styles.secondText}
                variant='h5'
                component='h5'
            >
                To create an order you can click on the buttons below
            </Typography>
        </div>
    );
};

export default EmptyOrdersBlock;

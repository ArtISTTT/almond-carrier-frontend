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
                You don&apos;t have any orders yet.
            </Typography>
        </div>
    );
};

export default EmptyOrdersBlock;

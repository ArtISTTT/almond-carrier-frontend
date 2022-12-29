import React from 'react';
import styles from '../../../styles/ProfileOrders.module.css';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';

const General = () => {
    return (
        <div className={styles.ordersWrapper}>
            <Typography
                className={styles.orderTitle}
                variant='h4'
                component='h3'
            >
                General
            </Typography>
        </div>
    );
};

export default General;

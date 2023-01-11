import React from 'react';
import styles from '../../../styles/EmptyOrders.module.css';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const EmptyOrdersBlock = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.emptyText}>
            <Typography
                className={styles.firstText}
                variant='h4'
                component='h4'
            >
                {t('youHaveNoOrdersYet')}
            </Typography>
        </div>
    );
};

export default EmptyOrdersBlock;

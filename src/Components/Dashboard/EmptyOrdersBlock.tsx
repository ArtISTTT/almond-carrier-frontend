import React from 'react';
import styles from '../../../styles/EmptyOrders.module.css';
import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';

const EmptyOrdersBlock = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.emptyTextDash}>
            <Typography
                className={styles.firstText}
                variant='h4'
                component='h4'
            >
                {t('youDontHaveAnyOrdersYet')}
            </Typography>
            <Typography
                className={styles.secondText}
                variant='h5'
                component='h5'
            >
                {t('toCreateAnOrderYouCanClick')}
            </Typography>
        </div>
    );
};

export default EmptyOrdersBlock;

import React from 'react';
import styles from '../../../styles/EmptyOrders.module.css';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface IProps {
    text: string;
}

const EmptyNoShadows: React.FC<IProps> = ({ text }) => {
    const { t } = useTranslation();

    return (
        <div className={styles.emptyText}>
            <Typography
                className={styles.firstText}
                variant='h4'
                component='h4'
            >
                {t(text)}
            </Typography>
        </div>
    );
};

export default EmptyNoShadows;

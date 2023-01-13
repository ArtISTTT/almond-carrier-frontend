import React from 'react';
import styles from '../../../styles/RecentlyCreatedOrder.module.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface IProps {
    item?: string;
    to: string;
    benefit: number;
}

const RecentlyCreatedOrder: React.FC<IProps> = ({ item, to, benefit }) => {
    const { t } = useTranslation();
    return (
        <div className={styles.littleOrder}>
            <div className={styles.arrow}>
                <ArrowForwardIosIcon sx={{ fontSize: 20 }} />
            </div>
            <div className={styles.littleOrderWrapper}>
                <div className={styles.littleOrderContent}>
                    {item && (
                        <Typography
                            variant='h6'
                            component='p'
                            className={styles.littleOrderItem}
                        >
                            {item}
                        </Typography>
                    )}
                    <Typography
                        variant='h6'
                        component='p'
                        className={styles.littleOrderTo}
                    >
                        {t('from')}: <span>{to}</span>
                    </Typography>
                    <Typography
                        variant='h6'
                        component='p'
                        className={styles.littleOrderBenefit}
                    >
                        {t('benifit')}: <span>{benefit}$</span>
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default RecentlyCreatedOrder;

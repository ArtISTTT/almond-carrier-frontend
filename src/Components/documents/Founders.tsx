import { Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../../styles/Founders.module.css';
import Founder from './Founder';

const Founders = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.foundersWrapper}>
            <Typography variant='h3' component='h3' className={styles.ourTeam}>
                {t('ourTeam')}
            </Typography>
            
            <Founder />
        </div>
    );
};

export default Founders;

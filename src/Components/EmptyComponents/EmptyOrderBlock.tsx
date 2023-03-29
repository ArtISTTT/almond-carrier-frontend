import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React from 'react';
import styles from '../../../styles/EmptyOrders.module.css';

type IProps = {
    text?: string;
    helperText?: string;
};

const EmptyBlock: React.FC<IProps> = ({
    text = 'youHaveNoOrdersYet',
    helperText = 'toCreateAnOrderYouCanClick',
}) => {
    const { t } = useTranslation();

    return (
        <div className={styles.emptyTextDash}>
            <Typography
                className={styles.firstText}
                variant='h4'
                component='h4'
            >
                {t(text)}
            </Typography>
            <Typography
                className={styles.secondText}
                variant='h5'
                component='h5'
            >
                {t(helperText)}
            </Typography>
        </div>
    );
};

export default EmptyBlock;

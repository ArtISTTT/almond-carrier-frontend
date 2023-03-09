import { Typography, Link as MUILink } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../../styles/Founders.module.css';
import TelegramIcon from '@mui/icons-material/Telegram';
import { LinkBehaviour } from '../Common/LinkBehaviour';

const Founder = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.founderWrapper}>
            <img
                className={styles.founderImage}
                src='/static/images/founders/founderArtem.png'
            />
            <Typography
                className={styles.founderName}
                variant='h6'
                component='h5'
            >
                Artem Gazukin
            </Typography>
            <Typography
                className={styles.founderRole}
                variant='h6'
                component='h4'
            >
                {t('CEOCTOBackendDevFrontDev')}
            </Typography>
            <MUILink
                className={styles.founderIcon}
                component={LinkBehaviour}
                href=''
            >
                <TelegramIcon className={styles.founderIcon} />
            </MUILink>
        </div>
    );
};

export default Founder;

import { Typography, Link as MUILink } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../../styles/Founders.module.css';
import TelegramIcon from '@mui/icons-material/Telegram';
import { LinkBehaviour } from '../Common/LinkBehaviour';

interface IProps {
    name: string;
    role: string;
    image: string;
    telegramLink: string;
}

const Founder: React.FC<IProps> = ({ name, role, image, telegramLink }) => {
    const { t } = useTranslation();

    return (
        <div className={styles.founderWrapper}>
            <img className={styles.founderImage} src={image} />
            <Typography
                className={styles.founderName}
                variant='h6'
                component='h5'
            >
                {t(name)}
            </Typography>
            <Typography
                className={styles.founderRole}
                variant='h6'
                component='h4'
            >
                {t(role)}
            </Typography>
            <MUILink
                className={styles.founderIcon}
                component={LinkBehaviour}
                target='_blank'
                href={'https://T.me/' + telegramLink}
            >
                <TelegramIcon className={styles.founderIcon} />
            </MUILink>
        </div>
    );
};

export default Founder;

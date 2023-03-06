import React from 'react';
import { Typography } from '@mui/material';
import styles from '../../../styles/SignIn.module.css';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import { useTranslation } from 'react-i18next';

type IProps = {
    email: string;
};

const ConfirmEmail: React.FC<IProps> = ({ email }) => {
    const { t } = useTranslation();

    return (
        <>
            <Typography
                className={styles.confirmLetterSent}
                variant='h3'
                component='h3'
            >
                {t('confirmationLetterSentTo')}
            </Typography>

            <div className={styles.emailBlock}>
                <MarkEmailUnreadIcon className={styles.emailIcon} />
                <Typography
                    className={styles.confirmLetterEmail}
                    variant='h3'
                    component='h3'
                >
                    {email}
                </Typography>
            </div>
            <Typography
                className={styles.confirmFinishRegistr}
                variant='h3'
                component='h3'
            >
                {t('followTheLinkToCompleteYourRegistration')}
            </Typography>
        </>
    );
};

export default ConfirmEmail;

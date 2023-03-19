import React from 'react';
import styles from '../../../styles/Settings.module.css';
import GeneralSettings from './General';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';

interface IProps {
    setIsSettingsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsPopup: React.FC<IProps> = ({ setIsSettingsPopupOpen }) => {
    const { t } = useTranslation();

    const closePopup = () => setIsSettingsPopupOpen(prev => !prev);

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div onClick={closePopup} className={styles.closeIcon}>
                    <CloseIcon />
                </div>
                <div className={styles.selectSettings}>
                    <div className={styles.generalSettingsChoose}>
                        <SettingsIcon sx={{ fontSize: 30 }} />
                        <Typography
                            className={styles.SettingsChooseText}
                            variant='h6'
                            component='h6'
                        >
                            {t('general')}
                        </Typography>
                    </div>
                    <div className={styles.notificationsChoose}>
                        <NotificationsIcon sx={{ fontSize: 30 }} />
                        <Typography
                            className={styles.SettingsChooseText}
                            variant='h6'
                            component='h6'
                        >
                            {t('notifications')}
                        </Typography>
                    </div>
                </div>
                <div className={styles.settingsContent}>
                    {<GeneralSettings />}
                </div>
            </div>
        </div>
    );
};

export default SettingsPopup;

import React from 'react';
import styles from '../../../styles/Settings.module.css';
import GeneralSettings from './General';
import Notifications from './Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

interface IProps {
    setIsSettingsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsPopup: React.FC<IProps> = ({ setIsSettingsPopupOpen }) => {
    const [isGeneralMenu, setIsGeneralMenu] = React.useState<boolean>(true);
    const { t } = useTranslation();
    const selectGeneral = () => setIsGeneralMenu(true);
    const selectNotifiations = () => setIsGeneralMenu(false);
    const closePopup = () => setIsSettingsPopupOpen(prev => !prev);

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div onClick={closePopup} className={styles.closeIcon}>
                    <CloseIcon />
                </div>
                <div className={styles.selectSettings}>
                    <div
                        onClick={selectGeneral}
                        className={cn(styles.generalSettingsChoose, {
                            [styles.thirdText]: !isGeneralMenu,
                        })}
                    >
                        <SettingsIcon sx={{ fontSize: 30 }} />
                        <Typography
                            className={styles.SettingsChooseText}
                            variant='h6'
                            component='h6'
                        >
                            {t('general')}
                        </Typography>
                    </div>
                    <div
                        onClick={selectNotifiations}
                        className={cn(styles.notificationsChoose, {
                            [styles.thirdText]: isGeneralMenu,
                        })}
                    >
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
                    {isGeneralMenu ? <GeneralSettings /> : <Notifications />}
                </div>
            </div>
        </div>
    );
};

export default SettingsPopup;

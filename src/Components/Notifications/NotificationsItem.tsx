import React from 'react';
import { Tooltip } from '@mui/material';
import styles from '../../../styles/Notifications.module.css';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useTranslation } from 'react-i18next';
import { IUserNotification } from 'src/interfaces/user';

interface IProps {
    id: string;
    text: string;
    deal: string;
    currentDate: string;
    setNotifications: React.Dispatch<React.SetStateAction<IUserNotification[]>>;
}

const NotificationsItem = ({
    text,
    deal,
    id,
    setNotifications,
    currentDate,
}: IProps) => {
    const { t } = useTranslation();

    const removeNotification = () => {
        setNotifications(prev =>
            prev.filter(notification => notification.id !== id)
        );
    };

    return (
        <div className={styles.notificationWrapper}>
            <div>{text}</div>
            <div className={styles.checkNotificationIcon}>
                <Tooltip placement='top' title={t('markAsRead') as string}>
                    <CheckBoxIcon
                        onClick={removeNotification}
                        sx={{
                            width: 22,
                            height: 22,
                        }}
                    />
                </Tooltip>
            </div>
        </div>
    );
};

export default NotificationsItem;

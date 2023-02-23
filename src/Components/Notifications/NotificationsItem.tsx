import React from 'react';
import { Tooltip } from '@mui/material';
import styles from '../../../styles/Notifications.module.css';
import { useTranslation } from 'react-i18next';
import FmdBadIcon from '@mui/icons-material/FmdBad';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import { useRouter } from 'next/router';
import { IUserNotification } from 'src/interfaces/notifications';

interface IProps {
    id: string;
    text: string;
    deal: string;
    orderId: string;
    currentDate: string;
    setNotifications: React.Dispatch<React.SetStateAction<IUserNotification[]>>;
}

const NotificationsItem: React.FC<IProps> = ({
    text,
    deal,
    orderId,
    id,
    setNotifications,
    currentDate,
}) => {
    const { t } = useTranslation();
    const router = useRouter();
    const removeNotification = () =>
        setNotifications(prev =>
            prev.filter(notification => notification.id !== id)
        );

    const navigateToDeal = () => router.push(`/order/${orderId}`);

    return (
        <div className={styles.notificationWrapper}>
            <div className={styles.notificationContent}>
                <div>
                    <div
                        onClick={navigateToDeal}
                        className={styles.notificationTitle}
                    >
                        {deal}
                    </div>
                    <div className={styles.notificationText}>
                        <FmdBadIcon />
                        <span>{t(text)}</span>
                    </div>
                    <div className={styles.notificationTime}>{currentDate}</div>
                </div>
                <div className={styles.checkNotificationIcon}>
                    <Tooltip placement='top' title={t('markAsRead') as string}>
                        <MarkChatReadIcon
                            onClick={removeNotification}
                            sx={{
                                width: 22,
                                height: 22,
                            }}
                        />
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};

export default NotificationsItem;

import React from 'react';
import { Tooltip } from '@mui/material';
import styles from '../../../styles/Notifications.module.css';
import { useTranslation } from 'react-i18next';

import { useDifferenceTime } from 'src/redux/hooks/useDifferenceTime';
import FmdBadIcon from '@mui/icons-material/FmdBad';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import dayjs, { Dayjs } from 'dayjs';
import { IUserNotification } from 'src/interfaces/notifications';

interface IProps {
    id: string;
    text: string;
    deal: string;
    currentDate: Dayjs;
    setNotifications: React.Dispatch<React.SetStateAction<IUserNotification[]>>;
}

const NotificationsItem: React.FC<IProps> = ({
    text,
    deal,
    id,
    setNotifications,
    currentDate,
}) => {
    const { t } = useTranslation();
    const notificationsTime = useDifferenceTime(dayjs());

    const removeNotification = () =>
        setNotifications(prev =>
            prev.filter(notification => notification.id !== id)
        );

    return (
        <div className={styles.notificationMobileWrapper}>
            <div className={styles.notificationContent}>
                <div className={styles.notificationContentInner}>
                    <div className={styles.notificationTitle}>{deal}</div>
                    <div className={styles.notificationMobileText}>
                        <div className={styles.notificationMobileTextInfo}>
                            <FmdBadIcon />
                            <span>{text}</span>
                        </div>
                        <div className={styles.checkNotificationIcon}>
                            <Tooltip
                                placement='top'
                                title={t('markAsRead') as string}
                            >
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
                    <div className={styles.notificationTime}>
                        {notificationsTime(currentDate)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationsItem;

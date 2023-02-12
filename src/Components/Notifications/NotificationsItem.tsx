import React from 'react';
import { Tooltip } from '@mui/material';
import styles from '../../../styles/Notifications.module.css';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useTranslation } from 'react-i18next';

interface IProps {
    text: string;
    deal: string;
}

const NotificationsItem = ({ text, deal }: IProps) => {
    const { t } = useTranslation();

    return (
        <div className={styles.notificationWrapper}>
            <div> NotificationsItem</div>

            <div className={styles.checkNotificationIcon}>
                <Tooltip placement='top' title={t('markAsRead') as string}>
                    <CheckBoxIcon
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

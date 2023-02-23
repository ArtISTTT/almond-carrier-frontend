import React from 'react';
import { useTranslation } from 'react-i18next';
import NotificationsItem from './NotificationsItem';

import styles from '../../../styles/Notifications.module.css';
import {
    ClickAwayListener,
    Grow,
    MenuList,
    Paper,
    Badge,
    Popper,
} from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { IUserNotification } from 'src/interfaces/notifications';

interface IProps {
    notifications: IUserNotification[];
    // setNotifications: React.Dispatch<React.SetStateAction<IUserNotification[]>>;
}

const NotificationsMenu: React.FC<IProps> = ({
    notifications,
    // setNotifications,
}) => {
    const [open, setOpen] = React.useState<boolean>(false);

    const anchorRef = React.useRef(null);
    const prevOpen = React.useRef(open);
    const { t } = useTranslation();

    React.useEffect(() => {
        prevOpen.current = open;
    }, [open]);

    const clearNotifications = () => {};
    const handleClose = () => setOpen(false);
    const handleToggle = () => setOpen(prevOpen => !prevOpen);

    return (
        <>
            <Badge
                className={styles.notificationsBadge}
                color='primary'
                badgeContent={notifications.length}
            >
                <NotificationsNoneIcon
                    ref={anchorRef}
                    onClick={handleToggle}
                    aria-haspopup='true'
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    className={styles.notificationsIconHeader}
                    sx={{ width: 30, height: 30, cursor: 'pointer' }}
                />
            </Badge>

            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement='bottom-start'
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom'
                                    ? 'center top'
                                    : 'center top',
                        }}
                        className={styles.growMenu}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id='menu-list-grow'>
                                    {notifications.length > 0 && (
                                        <>
                                            <div
                                                className={
                                                    styles.notificationsTitle
                                                }
                                            >
                                                {t('notifications')}
                                            </div>
                                            <div
                                                className={
                                                    styles.notficationsBlock
                                                }
                                            >
                                                {notifications.map(
                                                    notification => (
                                                        <NotificationsItem
                                                            key={
                                                                notification.id
                                                            }
                                                            // setNotifications={
                                                            //     setNotifications
                                                            // }
                                                            currentDate={
                                                                notification.createdDate
                                                            }
                                                            id={notification.id}
                                                            text={
                                                                notification.text
                                                            }
                                                            deal={
                                                                notification.productName
                                                            }
                                                        />
                                                    )
                                                )}
                                            </div>
                                            <div
                                                className={
                                                    styles.notificationsMarkAllButton
                                                }
                                                onClick={clearNotifications}
                                            >
                                                <ClearAllIcon
                                                    sx={{
                                                        width: 17,
                                                        height: 17,
                                                    }}
                                                />
                                                <span>
                                                    {t('markAllAsRead')}
                                                </span>
                                            </div>
                                        </>
                                    )}
                                    {notifications.length === 0 && (
                                        <div
                                            className={
                                                styles.emplyNotifications
                                            }
                                        >
                                            {t('noNotifications')}
                                        </div>
                                    )}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
};

export default NotificationsMenu;

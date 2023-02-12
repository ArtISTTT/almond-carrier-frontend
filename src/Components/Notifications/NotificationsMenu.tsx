import React from 'react';
import { useTranslation } from 'react-i18next';
import NotificationsItem from './NotificationsItem';
import styles from '../../../styles/Notifications.module.css';
import {
    ClickAwayListener,
    Grow,
    MenuList,
    Paper,
    Popper,
} from '@mui/material';

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import { IUserNotification } from 'src/interfaces/user';

const NotificationsMenu = () => {
    const [open, setOpen] = React.useState<boolean>(false);
    const [notifications, setNotifications] = React.useState<
        IUserNotification[]
    >([
        { text: 'qwe', deal: '123', id: 'lox' },
        { text: 'qwe', deal: '123', id: 'lox1' },
        { text: 'qwe', deal: '123', id: 'lox2' },
        { text: 'qwe', deal: '123', id: 'lox3' },
    ]);

    const anchorRef = React.useRef(null);
    const prevOpen = React.useRef(open);
    const { t } = useTranslation();

    React.useEffect(() => {
        prevOpen.current = open;
    }, [open]);

    const clearNotifications = () => setNotifications([]);
    const handleClose = () => setOpen(false);
    const handleToggle = () => setOpen(prevOpen => !prevOpen);

    return (
        <>
            <NotificationsNoneIcon
                ref={anchorRef}
                onClick={handleToggle}
                aria-haspopup='true'
                aria-controls={open ? 'menu-list-grow' : undefined}
                className={styles.notificationsIconHeader}
                sx={{ width: 37, height: 37, cursor: 'pointer' }}
            />

            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement='bottom-end'
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
                                    : 'center bottom',
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
                                            {notifications.map(notification => (
                                                <NotificationsItem
                                                    setNotifications={
                                                        setNotifications
                                                    }
                                                    id={notification.id}
                                                    text={notification.text}
                                                    deal={notification.deal}
                                                />
                                            ))}
                                            <div
                                                className={
                                                    styles.notificationsMarkAllButton
                                                }
                                                onClick={clearNotifications}
                                            >
                                                <MarkChatReadIcon
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

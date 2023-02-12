import React from 'react';
import { useTranslation } from 'react-i18next';
import NotificationsItem from './NotificationsItem';
import { IUserNotification } from 'src/interfaces/user';
import dayjs from 'dayjs';
import styles from '../../../styles/Notifications.module.css';
import {
    ClickAwayListener,
    Grow,
    MenuList,
    Paper,
    Popper,
} from '@mui/material';

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ClearAllIcon from '@mui/icons-material/ClearAll';

const NotificationsMenu = () => {
    const [open, setOpen] = React.useState<boolean>(false);
    const [notifications, setNotifications] = React.useState<
        IUserNotification[]
    >([
        {
            text: 'New message from carrier',
            deal: 'God of War: Ragnarok',
            id: 'lox',
            date: dayjs().set('hour', 5).set('minute', 55).set('second', 15),
        },
        {
            text: 'New message from receiver',
            deal: 'Crack',
            id: 'lox1',
            date: dayjs().set('hour', 4).set('minute', 55).set('second', 15),
        },
        {
            text: 'Payment success',
            deal: 'Mefedron',
            id: 'lox2',
            date: dayjs().set('hour', 2).set('minute', 55).set('second', 15),
        },
        {
            text: 'New changes',
            deal: 'Baby',
            id: 'lox3',
            date: dayjs().set('hour', 22).set('minute', 55).set('second', 15),
        },
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
                                                    currentDate={
                                                        notification.date
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

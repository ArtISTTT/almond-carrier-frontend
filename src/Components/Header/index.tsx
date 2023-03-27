import DashboardIcon from '@mui/icons-material/Dashboard';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Button, Link as MUILink } from '@mui/material';
import cn from 'classnames';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { parseNotificationsFromApi } from 'src/helpers/parceNotificationsFromApi';
import { navigateTo } from 'src/interfaces/navigate';
import { IUserNotification } from 'src/interfaces/notifications';
import { useLoadOwnNotifications } from 'src/redux/hooks/useLoadOwnNotifications';
import styles from '../../../styles/mainLayout.module.css';
import { selectIsAuthorized } from '../../redux/selectors/user';
import { LinkBehaviour } from '../Common/LinkBehaviour';
import { SocketIoContext } from '../Layouts/SocketIo';
import NotificationsMenu from '../Notifications/NotificationsMenu';
import HeaderAvatar from './Avatar';
import MobileMenu from './MobileMenu';
import ThemeSwitcher from './ThemeSwitcher';

type IProps = {
    showContinueIfAuthorized: boolean;
    showSignInOutIfUnauthorized: boolean;
};

const Header: React.FC<IProps> = ({
    showContinueIfAuthorized,
    showSignInOutIfUnauthorized,
}) => {
    const router = useRouter();
    const { t } = useTranslation();

    const socket = useContext(SocketIoContext);
    const isAuthorized = useSelector(selectIsAuthorized);

    const [isSettingsPopupOpen, setIsSettingsPopupOpen] =
        React.useState<boolean>(false);

    const { reload, isLoading, notifications, setNotifications } =
        useLoadOwnNotifications();

    React.useEffect(() => {
        if (isAuthorized) {
            reload();
            configureSocket();
        }
    }, []);

    const configureSocket = () => {
        if (socket && socket.connected) {
            socket.on(
                'new-notification',
                ({ notification }: { notification: IUserNotification }) =>
                    setNotifications(prev => [
                        ...parseNotificationsFromApi([notification]),
                        ...prev,
                    ])
            );
        }
    };

    const changePageIfAuthorized = () => {
        router.push(navigateTo.LANDING);
    };

    return (
        <header className={styles.header}>
            <div
                className={cn(styles.leftMenu, {
                    [styles.leftMenuAuth]: !isAuthorized,
                })}
            >
                <div>
                    <Avatar
                        className={styles.frindlyAvatar}
                        onClick={changePageIfAuthorized}
                        sx={{ width: 55, height: 55, cursor: 'pointer' }}
                        alt='logo'
                        src='/static/images/logo.png'
                    />
                </div>

                <div className={cn(styles.leftMenuLinksAuth)}>
                    {isAuthorized && (
                        <div className={styles.linkBlock}>
                            <DashboardIcon className={styles.headerIcon} />
                            <MUILink
                                href={navigateTo.DASHBOARD}
                                className={styles.link}
                                component={LinkBehaviour}
                                underline='none'
                            >
                                {t('dashboard')}
                            </MUILink>
                        </div>
                    )}
                    <div className={styles.linkBlock}>
                        <MUILink
                            href={navigateTo.ORDER_SEARCH}
                            className={styles.headerIconNoAuthorized}
                            component={LinkBehaviour}
                            underline='none'
                        >
                            <SearchIcon />
                        </MUILink>
                        <MUILink
                            href={navigateTo.ORDER_SEARCH}
                            className={styles.link}
                            component={LinkBehaviour}
                            underline='none'
                        >
                            {t('orderSearch')}
                        </MUILink>
                    </div>
                </div>
            </div>
            <div className={styles.rightMenu}>
                <div className={styles.themeSwitcher}>
                    <ThemeSwitcher />
                </div>
                {!isAuthorized && showSignInOutIfUnauthorized && (
                    <div className={styles.rightMenuButtons}>
                        <Button className={styles.button} variant='outlined'>
                            <MUILink
                                component={LinkBehaviour}
                                href={navigateTo.SIGNIN}
                            >
                                {t('signIn')}
                            </MUILink>
                        </Button>
                        <Button className={styles.button} variant='outlined'>
                            <MUILink
                                component={LinkBehaviour}
                                href={navigateTo.SIGNUP}
                            >
                                {t('signUp')}
                            </MUILink>
                        </Button>
                    </div>
                )}
                {isAuthorized && (
                    <div className={styles.authoridedIcons}>
                        <NotificationsMenu
                            notifications={notifications}
                            setNotifications={setNotifications}
                        />
                        <HeaderAvatar
                            setIsSettingsPopupOpen={setIsSettingsPopupOpen}
                            isSettingsPopupOpen={isSettingsPopupOpen}
                        />
                    </div>
                )}
            </div>

            <MobileMenu
                setNotifications={setNotifications}
                notifications={notifications}
                isSettingsPopupOpen={isSettingsPopupOpen}
                setIsSettingsPopupOpen={setIsSettingsPopupOpen}
                showSignInOutIfUnauthorized={showSignInOutIfUnauthorized}
            />
        </header>
    );
};

export default Header;

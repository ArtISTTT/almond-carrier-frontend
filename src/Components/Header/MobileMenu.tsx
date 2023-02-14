import React, { useContext } from 'react';
import styles from '../../../styles/mainLayout.module.css';
import SettingsPopup from '../SettingsPopup/SettingsPopup';
import { useTranslation } from 'react-i18next';
import { navigateTo } from 'src/interfaces/navigate';
import { LinkBehaviour } from '../Common/LinkBehaviour';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { selectIsAuthorized, selectUser } from 'src/redux/selectors/user';
import { useRouter } from 'next/router';
import { signOut } from 'src/api/auth';
import { OpenAlertContext } from '../Layouts/Snackbar';
import { setIsAuthorized } from 'src/redux/slices/userSlice';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import {
    ClickAwayListener,
    Paper,
    MenuList,
    MenuItem,
    Link as MUILink,
    Avatar,
    Button,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import PaymentsIcon from '@mui/icons-material/Payments';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import SearchIcon from '@mui/icons-material/Search';
import { IUserNotification } from 'src/interfaces/user';
import NotificationsMobileItem from '../Notifications/NotificationsMobileItem';

interface IProps {
    notifications: IUserNotification[];
    setNotifications: React.Dispatch<React.SetStateAction<IUserNotification[]>>;
    showSignInOutIfUnauthorized: boolean;
    isSettingsPopupOpen: boolean;
    setIsSettingsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu = ({
    notifications,
    setNotifications,
    showSignInOutIfUnauthorized,
    isSettingsPopupOpen,
    setIsSettingsPopupOpen,
}: IProps) => {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState<boolean>(false);
    const [animate, setAnimate] = React.useState<boolean>(false);

    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const router = useRouter();
    const isAuthorized = useSelector(selectIsAuthorized);
    const { t } = useTranslation();
    const { triggerOpen } = useContext(OpenAlertContext);

    const handleCloseMenu = () => {
        setTimeout(() => {
            setMobileMenuOpen(false);
        }, 295);
        setAnimate(false);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(true);
        setAnimate(true);
    };

    const handleOpenSettingsPopup = () => {
        setMobileMenuOpen(false);
        setAnimate(false);
        setIsSettingsPopupOpen(prev => !prev);
    };

    const handleSignOut = async () => {
        const data = await signOut();

        if (data.ok) {
            dispatch(setIsAuthorized(false));
            router.push(navigateTo.LANDING);
        } else {
            triggerOpen({
                severity: 'error',
                text: data.error || t('signOutError'),
            });
        }
    };

    const clearNotifications = () => setNotifications([]);
    const goToProfile = () => router.push(navigateTo.PROFILE_ORDERS);
    const goToDashboard = () => router.push(navigateTo.DASHBOARD);
    const goToOrdersSearch = () => router.push(navigateTo.ORDER_SEARCH);

    return (
        <>
            <div
                className={cn(styles.blurWrapper, {
                    [styles.blurWrapperOn]: mobileMenuOpen,
                })}
            />
            <div className={styles.mobileMenuWrapper}>
                {isAuthorized && (
                    <MenuIcon
                        onClick={toggleMobileMenu}
                        sx={{ width: 30, height: 30, cursor: 'pointer' }}
                    />
                )}
                {isSettingsPopupOpen && (
                    <SettingsPopup
                        setIsSettingsPopupOpen={setIsSettingsPopupOpen}
                    />
                )}
                {!isAuthorized && showSignInOutIfUnauthorized && (
                    <>
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
                    </>
                )}
                {mobileMenuOpen && (
                    <div
                        className={cn(styles.mobileMenu, {
                            [styles.openMobileMenu]: animate,
                            [styles.closeMobileMenu]: !animate,
                        })}
                    >
                        <ClickAwayListener onClickAway={handleCloseMenu}>
                            <Paper className={styles.mobileMenuPaper}>
                                <MenuList>
                                    <MenuItem className={styles.userItem}>
                                        <Avatar
                                            className={styles.userAvatarMobile}
                                            sx={{ width: 35, height: 35 }}
                                            src={user.avatar ?? ''}
                                            alt='logo'
                                        />
                                        <div>
                                            <span>
                                                {user.firstName} {user.lastName}
                                            </span>
                                            <div>{user.email}</div>
                                        </div>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={goToProfile}
                                        className={styles.profileItemMobile}
                                    >
                                        <AccountBoxIcon
                                            className={styles.mobileMenuIcon}
                                        />
                                        <span>{t('profile')}</span>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={handleOpenSettingsPopup}
                                        className={styles.settingsItem}
                                    >
                                        <SettingsIcon
                                            className={styles.mobileMenuIcon}
                                        />
                                        <span>{t('settings')}</span>
                                    </MenuItem>
                                    <MenuItem className={styles.bullingItem}>
                                        <PaymentsIcon
                                            className={styles.mobileMenuIcon}
                                        />
                                        <span>{t('billing')}</span>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={goToDashboard}
                                        className={styles.dashboardItem}
                                    >
                                        <DashboardIcon
                                            className={styles.mobileMenuIcon}
                                        />
                                        <span>{t('dashboard')}</span>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={goToOrdersSearch}
                                        className={styles.orderSearchItem}
                                    >
                                        <SearchIcon
                                            className={styles.mobileMenuIcon}
                                        />
                                        <span>{t('orderSearch')}</span>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={handleSignOut}
                                        className={cn(styles.exitItem, {
                                            [styles.openMobileMenu]: animate,
                                            [styles.closeMobileMenu]: !animate,
                                        })}
                                    >
                                        {t('logOut')}
                                    </MenuItem>
                                </MenuList>
                                {notifications.length > 0 && (
                                    <>
                                        <div
                                            className={
                                                styles.notificationsMobileTitle
                                            }
                                        >
                                            {t('notifications')}
                                        </div>
                                        <div
                                            className={
                                                styles.notificationsMobileBlock
                                            }
                                        >
                                            {notifications.map(notification => (
                                                <NotificationsMobileItem
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
                                            <div>{t('markAllAsRead')}</div>
                                        </div>
                                    </>
                                )}
                                {notifications.length === 0 && (
                                    <div className={styles.emplyNotifications}>
                                        {t('noNotifications')}
                                    </div>
                                )}
                            </Paper>
                        </ClickAwayListener>
                    </div>
                )}
            </div>
        </>
    );
};

export default MobileMenu;

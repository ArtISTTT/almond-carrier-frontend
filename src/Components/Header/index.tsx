import {
    Avatar,
    Button,
    Link as MUILink,
    Paper,
    MenuItem,
    MenuList,
    ClickAwayListener,
} from '@mui/material';
import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import styles from '../../../styles/mainLayout.module.css';
import { selectIsAuthorized, selectUser } from '../../redux/selectors/user';
import HeaderAvatar from './Avatar';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { navigateTo } from 'src/interfaces/navigate';
import { LinkBehaviour } from '../Common/LinkBehaviour';
import { useAppSelector } from 'src/redux/hooks';

import MenuIcon from '@mui/icons-material/Menu';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import PaymentsIcon from '@mui/icons-material/Payments';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SearchIcon from '@mui/icons-material/Search';
import SettingsPopup from '../SettingsPopup/SettingsPopup';

type IProps = {
    showContinueIfAuthorized: boolean;
    showSignInOutIfUnauthorized: boolean;
};

const Header: React.FC<IProps> = ({
    showContinueIfAuthorized,
    showSignInOutIfUnauthorized,
}) => {
    const router = useRouter();
    const user = useAppSelector(selectUser);
    const isAuthorized = useSelector(selectIsAuthorized);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState<boolean>(false);
    const [isSettingsPopupOpen, setIsSettingsPopupOpen] =
        React.useState<boolean>(false);
    const { t } = useTranslation();

    const changePageIfAuthorized = () => {
        if (isAuthorized) {
            router.push(navigateTo.DASHBOARD);
        } else {
            router.push(navigateTo.SIGNIN);
        }
    };

    const handleOpenSettingsPopup = () => {
        setMobileMenuOpen(false);
        setIsSettingsPopupOpen(prev => !prev);
    };

    const handleClose = () => setMobileMenuOpen(false);
    const toggleMobileMenu = () => setMobileMenuOpen(true);

    const goToProfile = () => router.push(navigateTo.PROFILE_ORDERS);
    const goToDashboard = () => router.push(navigateTo.DASHBOARD);
    const goToOrdersSearch = () => router.push(navigateTo.ORDER_SEARCH);

    return (
        <header className={styles.header}>
            <div className={styles.leftMenu}>
                <Avatar
                    onClick={changePageIfAuthorized}
                    sx={{ width: 55, height: 55, cursor: 'pointer' }}
                    alt='logo'
                    src='/static/images/logo.png'
                />
                {isAuthorized && (
                    <div className={styles.leftMenuLinks}>
                        <MUILink
                            href={navigateTo.DASHBOARD}
                            className={styles.link}
                            component={LinkBehaviour}
                            underline='none'
                        >
                            {t('dashboard')}
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
                )}
            </div>
            <div className={styles.rightMenu}>
                <div className={styles.rightMenuButtons}>
                    {!isAuthorized && showSignInOutIfUnauthorized && (
                        <>
                            <Button
                                className={styles.button}
                                variant='outlined'
                            >
                                <Link href={navigateTo.SIGNIN}>
                                    {t('signIn')}
                                </Link>
                            </Button>
                            <Button
                                className={styles.button}
                                variant='outlined'
                            >
                                <Link href={navigateTo.SIGNUP}>
                                    {t('signUp')}
                                </Link>
                            </Button>
                        </>
                    )}
                </div>
                {isAuthorized && (
                    <HeaderAvatar
                        setIsSettingsPopupOpen={setIsSettingsPopupOpen}
                        isSettingsPopupOpen={isSettingsPopupOpen}
                    />
                )}
            </div>

            <div className={styles.mobileMenuWrapper}>
                <MenuIcon
                    onClick={toggleMobileMenu}
                    sx={{ width: 30, height: 30, cursor: 'pointer' }}
                />
                {isSettingsPopupOpen && (
                    <SettingsPopup
                        setIsSettingsPopupOpen={setIsSettingsPopupOpen}
                    />
                )}
                {mobileMenuOpen && (
                    <div className={styles.mobileMenu}>
                        <ClickAwayListener onClickAway={handleClose}>
                            <Paper className={styles.mobileMenuPaper}>
                                <MenuList>
                                    <MenuItem className={styles.userItem}>
                                        <span>
                                            {user.firstName} {user.lastName}
                                        </span>
                                        <div>{user.email}</div>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={goToProfile}
                                        className={styles.profileItem}
                                    >
                                        <AccountBoxIcon />
                                        <span>{t('profile')}</span>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={handleOpenSettingsPopup}
                                        className={styles.settingsItem}
                                    >
                                        <SettingsIcon />
                                        <span>{t('settings')}</span>
                                    </MenuItem>
                                    <MenuItem className={styles.bullingItem}>
                                        <PaymentsIcon />
                                        <span>{t('billing')}</span>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={goToDashboard}
                                        className={styles.dashboardItem}
                                    >
                                        <DashboardIcon />
                                        <span>{t('dashboard')}</span>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={goToOrdersSearch}
                                        className={styles.orderSearchItem}
                                    >
                                        <SearchIcon />
                                        <span>{t('orderSearch')}</span>
                                    </MenuItem>
                                    <MenuItem className={styles.exitItem}>
                                        {t('logOut')}
                                    </MenuItem>
                                </MenuList>
                            </Paper>
                        </ClickAwayListener>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;

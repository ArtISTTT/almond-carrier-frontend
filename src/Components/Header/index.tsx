import { Avatar, Button, Link as MUILink } from '@mui/material';
import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import styles from '../../../styles/mainLayout.module.css';
import { selectIsAuthorized } from '../../redux/selectors/user';
import HeaderAvatar from './Avatar';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { navigateTo } from 'src/interfaces/navigate';
import { LinkBehaviour } from '../Common/LinkBehaviour';
import MobileMenu from './MobileMenu';

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
    const isAuthorized = useSelector(selectIsAuthorized);

    const [isSettingsPopupOpen, setIsSettingsPopupOpen] =
        React.useState<boolean>(false);

    const changePageIfAuthorized = () => {
        if (isAuthorized) {
            router.push(navigateTo.DASHBOARD);
        } else {
            router.push(navigateTo.SIGNIN);
        }
    };

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
                                <MUILink
                                    component={LinkBehaviour}
                                    href={navigateTo.SIGNIN}
                                >
                                    {t('signIn')}
                                </MUILink>
                            </Button>
                            <Button
                                className={styles.button}
                                variant='outlined'
                            >
                                <MUILink
                                    component={LinkBehaviour}
                                    href={navigateTo.SIGNUP}
                                >
                                    {t('signUp')}
                                </MUILink>
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
            <MobileMenu
                isSettingsPopupOpen={isSettingsPopupOpen}
                setIsSettingsPopupOpen={setIsSettingsPopupOpen}
                showSignInOutIfUnauthorized={showSignInOutIfUnauthorized}
            />
        </header>
    );
};

export default Header;

export default Header;

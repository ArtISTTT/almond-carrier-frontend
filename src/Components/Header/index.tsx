import { Avatar, Button, Link as MUILink } from '@mui/material';

import React from 'react';
import styles from '../../../styles/mainLayout.module.css';
import { useSelector } from 'react-redux';
import { selectIsAuthorized } from '../../redux/selectors/user';
import HeaderAvatar from './Avatar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { navigateTo } from 'src/interfaces/navigate';

type IProps = {
    showContinueIfAuthorized: boolean;
    showSignInOutIfUnauthorized: boolean;
};

const Header: React.FC<IProps> = ({
    showContinueIfAuthorized,
    showSignInOutIfUnauthorized,
}) => {
    const router = useRouter();
    const isAuthorized = useSelector(selectIsAuthorized);
    const { t } = useTranslation();

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
                        <Link href={navigateTo.DASHBOARD}>
                            <MUILink className={styles.link} underline='none'>
                                {t('dashboard')}
                            </MUILink>
                        </Link>
                        <Link href={navigateTo.ORDER_SEARCH}>
                            <MUILink className={styles.link} underline='none'>
                                {t('orderSearch')}
                            </MUILink>
                        </Link>
                        {/* <MUILink className={styles.link} underline='none'>
                            Link 3
                        </MUILink> */}
                    </div>
                )}
            </div>
            <div className={styles.rightMenu}>
                <div className={styles.rightMenuButtons}>
                    {isAuthorized && showContinueIfAuthorized && (
                        <>
                            <Button
                                className={styles.button}
                                variant='outlined'
                            >
                                <Link href={navigateTo.DASHBOARD}>
                                    {t('continue')}
                                </Link>
                            </Button>
                        </>
                    )}
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
                {isAuthorized && <HeaderAvatar />}
            </div>
        </header>
    );
};

export default Header;

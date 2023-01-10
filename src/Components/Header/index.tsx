import { Avatar, Button, Link as MUILink } from '@mui/material';

import React from 'react';
import styles from '../../../styles/mainLayout.module.css';
import { useSelector } from 'react-redux';
import { selectIsAuthorized } from '../../redux/selectors/user';
import HeaderAvatar from './Avatar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

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
            router.push('/dashboard');
        } else {
            router.push('/signin');
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
                        <Link href='/dashboard'>
                            <MUILink className={styles.link} underline='none'>
                                {t('dashboard')}
                            </MUILink>
                        </Link>
                        <Link href='/order-search'>
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
                                <Link href='/dashboard'>{t('continue')}</Link>
                            </Button>
                        </>
                    )}
                    {!isAuthorized && showSignInOutIfUnauthorized && (
                        <>
                            <Button
                                className={styles.button}
                                variant='outlined'
                            >
                                <Link href='/signin'>{t('signIn')}</Link>
                            </Button>
                            <Button
                                className={styles.button}
                                variant='outlined'
                            >
                                <Link href='/signup'>{t('signUp')}</Link>
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

import { Avatar, Button, Link as MUILink } from '@mui/material';

import React from 'react';
import styles from '../../../styles/mainLayout.module.css';
import { useSelector } from 'react-redux';
import { selectIsAuthorized } from '../../redux/selectors/user';
import HeaderAvatar from './Avatar';
import Link from 'next/link';

type IProps = {
    showContinueIfAuthorized: boolean;
    showSignInOutIfUnauthorized: boolean;
};

const Header: React.FC<IProps> = ({
    showContinueIfAuthorized,
    showSignInOutIfUnauthorized,
}) => {
    const isAuthorized = useSelector(selectIsAuthorized);

    return (
        <header className={styles.header}>
            <div className={styles.leftMenu}>
                <Avatar
                    sx={{ width: 55, height: 55 }}
                    alt='logo'
                    src='/static/images/logo.png'
                />
                {isAuthorized && (
                    <div className={styles.leftMenuLinks}>
                        <MUILink className={styles.link} underline='none'>
                            Link 1
                        </MUILink>
                        <MUILink className={styles.link} underline='none'>
                            Link 2
                        </MUILink>
                        <MUILink className={styles.link} underline='none'>
                            Link 3
                        </MUILink>
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
                                <Link href='/reciever'>
                                    Continue as a receiver
                                </Link>
                            </Button>
                            <Button
                                className={styles.button}
                                variant='outlined'
                            >
                                <Link href='/carrier'>
                                    Continue as a carrier
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
                                <Link href='/signin'>Sign in</Link>
                            </Button>
                            <Button
                                className={styles.button}
                                variant='outlined'
                            >
                                <Link href='/signup'>Sign up</Link>
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

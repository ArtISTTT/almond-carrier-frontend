import React from 'react';
import Link from 'next/link';
import { Avatar, Container, Button } from '@mui/material';
import styles from '/styles/Header.module.css';

const Header = () => {
    return (
        <header className={styles.wrapper}>
            <Container className={styles.content} maxWidth={false}>
                <Avatar
                    sx={{ width: 60, height: 60 }}
                    src='/static/images/pre-logo.png'
                    alt='logo'
                />
                <div>
                    <Link href='/signin'>
                        <Button
                            color='primary'
                            className={styles.button}
                            variant='outlined'
                        >
                            Sign in
                        </Button>
                    </Link>
                    <Link href='/signup'>
                        <Button
                            color='primary'
                            className={styles.button}
                            variant='outlined'
                        >
                            Sign up
                        </Button>
                    </Link>
                </div>
            </Container>
        </header>
    );
};

export default Header;

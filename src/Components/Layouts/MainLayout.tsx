import { Avatar, Button, Link as MUILink } from '@mui/material';

import React from 'react';
import styles from '../../../styles/mainLayout.module.css';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <header className={styles.header}>
                <div className={styles.leftMenu}>
                    <Avatar
                        sx={{ width: 55, height: 55 }}
                        alt='logo'
                        src='/static/images/logo.png'
                    />
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
                </div>
                <div className={styles.rightMenu}>
                    <div className={styles.rightMenuButtons}>
                        <Button className={styles.button} variant='outlined'>
                            Continue as a receiver
                        </Button>
                        <Button className={styles.button} variant='outlined'>
                            Continue as a carrier
                        </Button>
                    </div>
                    <Avatar
                        sx={{ width: 40, height: 40 }}
                        src=''
                        alt='profile'
                    />
                </div>
            </header>
            {children}
            <div></div>
        </>
    );
};

export default MainLayout;

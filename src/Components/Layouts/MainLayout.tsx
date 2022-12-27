import { Avatar, Button, Link as MUILink } from '@mui/material';

import React from 'react';
import styles from '../../../styles/mainLayout.module.css';
import Header from '../Header';

type IProps = {
    showContinueIfAuthorized: boolean;
    showSignInOutIfUnauthorized: boolean;
    children: React.ReactNode;
};

const MainLayout: React.FC<IProps> = ({ children, ...props }) => {
    return (
        <div className={styles.mainWrapper}>
            <Header {...props} />
            <div className={styles.content}>{children}</div>
            <div></div>
        </div>
    );
};

export default MainLayout;

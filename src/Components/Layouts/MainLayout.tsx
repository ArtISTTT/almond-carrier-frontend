import { Avatar, Button, Link as MUILink } from '@mui/material';

import React from 'react';
import styles from '../../../styles/mainLayout.module.css';
import Header from '../Header';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <div></div>
        </>
    );
};

export default MainLayout;

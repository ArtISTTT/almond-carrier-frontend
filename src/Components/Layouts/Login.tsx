import { Avatar } from '@mui/material';
import React from 'react';
import style from '../../../styles/SignIn.module.css';
import { privateTypes } from '../../interfaces/private';
import PrivateLayout from './Private';
import MainLayout from './MainLayout';

const LoginLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <PrivateLayout privateType={privateTypes.onlyUnauthorized}>
        <MainLayout
            showContinueIfAuthorized={false}
            showSignInOutIfUnauthorized={false}
        >
            <div className={style.loginWrapper}>
                <div className={style.loginInner}>
                    <Avatar
                        sx={{ width: 120, height: 120 }}
                        src='/static/images/logo.png'
                        alt='logo'
                    />
                    {children}
                </div>
                <svg viewBox='0 0 500 250' preserveAspectRatio='xMinYMin meet'>
                    <path
                        d='M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z'
                        style={{ stroke: 'none', fill: '#87a9ff' }}
                    ></path>
                </svg>
            </div>
        </MainLayout>
    </PrivateLayout>
);

export default LoginLayout;

import { Avatar } from '@mui/material';
import React from 'react';
import style from '../../../styles/SignIn.module.css';

type IForm = {
    email: string;
    password: string;
    confirmPasswrod: string;
    name: string;
    lastName: string;
    dateOfBirth: Date;
};

const LoginLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className={style.loginWrapper}>
        <div className={style.loginInner}>
            <Avatar
                sx={{ width: 120, height: 120 }}
                src='/static/images/pre-logo.png'
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
);

export default LoginLayout;

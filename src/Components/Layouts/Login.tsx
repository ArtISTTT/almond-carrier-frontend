import { Avatar } from '@mui/material';
import React from 'react';
import style from '../../../styles/SignIn.module.css';
import { privateTypes } from '../../interfaces/private';
import PrivateLayout from './Private';
import MainLayoutLogin from './MainLayoutLogin';

interface IProps {
    children: React.ReactNode;
}

const LoginLayout: React.FC<IProps> = ({ children }) => (
    <PrivateLayout privateType={privateTypes.onlyUnauthorized}>
        <MainLayoutLogin
            showContinueIfAuthorized={false}
            showSignInOutIfUnauthorized={false}
        >
            <div className={style.loginWrapper}>
                <div className={style.loginInner}>
                    <Avatar
                        sx={{ width: 120, height: 120 }}
                        src='/static/images/logo.png'
                        className={style.loginImage}
                        alt='logo'
                    />
                    {children}
                </div>
            </div>
        </MainLayoutLogin>
    </PrivateLayout>
);

export default LoginLayout;

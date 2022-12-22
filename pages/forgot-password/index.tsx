import {
    Avatar,
    Button,
    Input,
    Link as MUILink,
    TextField,
} from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import style from '../../styles/SignIn.module.css';
import cn from 'classnames';
import Link from 'next/link';

type IForm = {
    email: string;
    password: string;
    confirmPasswrod: string;
    name: string;
    lastName: string;
    dateOfBirth: Date;
};

const SignIn: React.FC = () => {
    const handleSignIn = (form: IForm) => {
        console.log(form);
    };

    return (
        <div className={style.loginWrapper}>
            <div className={style.loginInner}>
                <Avatar
                    sx={{ width: 120, height: 120 }}
                    src='/static/images/pre-logo.png'
                    alt='logo'
                />
                <h2>
                    Enter email <br />
                    to recover password
                </h2>
                <form action='submit'>
                    <Stack direction='column' spacing={2}>
                        <TextField
                            id='email'
                            placeholder='Email'
                            variant='outlined'
                        />
                        <Button
                            variant='contained'
                            className={style.confirmButton}
                        >
                            Restore password
                        </Button>
                        <Link href='/signin'>
                            <MUILink className={style.forgotPassword}>
                                ← Retun to Sign in
                            </MUILink>
                        </Link>
                    </Stack>
                </form>
            </div>
            <svg viewBox='0 0 500 250' preserveAspectRatio='xMinYMin meet'>
                <path
                    d='M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z'
                    style={{ stroke: 'none', fill: '#87a9ff' }}
                ></path>
            </svg>
        </div>
    );
};

export default SignIn;

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
                <h2>Sign in</h2>
                <form action='submit'>
                    <Stack direction='column' spacing={2}>
                        <TextField
                            id='email'
                            placeholder='Email'
                            variant='outlined'
                        />
                        <TextField
                            id='password'
                            placeholder='Password'
                            variant='outlined'
                        />
                        <Button
                            variant='contained'
                            className={style.confirmButton}
                        >
                            Sign in
                        </Button>
                        <Stack
                            direction='row'
                            spacing={2}
                            justifyContent='space-between'
                        >
                            <Link href='/signup'>
                                <MUILink className={style.helpLink}>
                                    Don't have an account?
                                </MUILink>
                            </Link>
                            <Link href='/forgot-password'>
                                <MUILink className={style.helpLink}>
                                    Forgot your password?
                                </MUILink>
                            </Link>
                        </Stack>
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

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
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { LinkBehaviour } from '../../src/Components/Common/LinkBehaviour';

type IForm = {
    email: string;
    password: string;
};

const SignIn: React.FC = () => {
    const router = useRouter();

    const handleSignIn = (form: IForm) => {
        console.log(form);
        formik.isSubmitting = false;
        // router.push('/carrier/main');
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: handleSignIn,
    });

    return (
        <div className={style.loginWrapper}>
            <div className={style.loginInner}>
                <Avatar
                    sx={{ width: 120, height: 120 }}
                    src='/static/images/pre-logo.png'
                    alt='logo'
                />
                <h2>Sign in</h2>
                <form action='submit' onSubmit={formik.handleSubmit}>
                    <Stack direction='column' spacing={2}>
                        <TextField
                            id='email'
                            name='email'
                            type='email'
                            placeholder='Email'
                            variant='outlined'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        <TextField
                            id='password'
                            name='password'
                            type='password'
                            placeholder='Password'
                            variant='outlined'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        <Button
                            variant='contained'
                            className={style.confirmButton}
                            type='submit'
                            disabled={formik.isSubmitting}
                        >
                            Sign in
                        </Button>
                        <Stack
                            direction='row'
                            spacing={2}
                            justifyContent='space-between'
                        >
                            <MUILink
                                className={style.helpLink}
                                href='/signup'
                                component={LinkBehaviour}
                            >
                                Don't have an account?
                            </MUILink>
                            <MUILink
                                className={style.helpLink}
                                href='/forgot-password'
                                component={LinkBehaviour}
                            >
                                Forgot your password?
                            </MUILink>
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

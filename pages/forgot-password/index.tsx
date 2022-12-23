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
import { LinkBehaviour } from '../../src/Components/Common/LinkBehaviour';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';

type IForm = {
    email: string;
};

const SignIn: React.FC = () => {
    const router = useRouter();

    const handleSignUp = (form: IForm) => {
        console.log(form);
        router.push('/carrier/main');
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPasswrod: '',
            name: '',
            lastName: '',
            dateOfBirth: new Date(),
        },
        onSubmit: handleSignUp,
    });

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
                            name='email'
                            placeholder='Email'
                            variant='outlined'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        <Button
                            variant='contained'
                            className={style.confirmButton}
                            type='submit'
                            disabled={formik.isSubmitting}
                        >
                            Restore password
                        </Button>
                        <MUILink
                            className={style.helpLink}
                            href='/signin'
                            component={LinkBehaviour}
                        >
                            ← Retun to Sign in
                        </MUILink>
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

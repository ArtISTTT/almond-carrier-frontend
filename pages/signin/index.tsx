import { Avatar, Button, Input, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import style from '../../styles/SignIn.module.css';
import cn from 'classnames';

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
                <h2>Create your account for free!</h2>
                <form action='submit'>
                    <Stack direction='column' spacing={2}>
                        <TextField
                            id='email'
                            placeholder='Email'
                            variant='outlined'
                        />
                        <Stack direction='row' spacing={2}>
                            <TextField
                                className={cn(style.input, style.nameInput)}
                                id='name'
                                placeholder='First Name'
                                variant='outlined'
                            />
                            <TextField
                                className={cn(style.input, style.nameInput)}
                                id='lastName'
                                placeholder='Last Name'
                                variant='outlined'
                            />
                        </Stack>
                        <TextField
                            id='dateOfBirth'
                            placeholder='Date of Birth'
                            type='date'
                            variant='outlined'
                        />
                        <TextField
                            id='password'
                            placeholder='Password'
                            variant='outlined'
                        />
                        <TextField
                            id='confirmPassword'
                            placeholder='Confirm password'
                            variant='outlined'
                        />
                        <Button variant='contained'>Register</Button>
                    </Stack>
                </form>
            </div>
            <svg viewBox='0 0 500 500' preserveAspectRatio='xMinYMin meet'>
                <path
                    d='M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z'
                    style={{ stroke: 'none', fill: '#87a9ff' }}
                ></path>
            </svg>
        </div>
    );
};

export default SignIn;

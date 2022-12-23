import { Button, TextField, Link as MUILink } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import style from '../../styles/SignIn.module.css';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { LinkBehaviour } from '../../src/Components/Common/LinkBehaviour';
import LoginLayout from '../../src/Components/Layouts/Login';

type IForm = {
    email: string;
    password: string;
    confirmPasswrod: string;
    name: string;
    lastName: string;
    dateOfBirth: Date;
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
        <LoginLayout>
            <>
                <h2>Create your account for free!</h2>
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
                        <Stack direction='row' spacing={2}>
                            <TextField
                                className={cn(style.input, style.nameInput)}
                                id='name'
                                name='name'
                                placeholder='First Name'
                                variant='outlined'
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />
                            <TextField
                                className={cn(style.input, style.nameInput)}
                                id='lastName'
                                name='lastName'
                                placeholder='Last Name'
                                variant='outlined'
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                            />
                        </Stack>
                        <TextField
                            id='dateOfBirth'
                            name='dateOfBirth'
                            placeholder='Date of Birth'
                            type='date'
                            variant='outlined'
                            value={formik.values.dateOfBirth}
                            onChange={formik.handleChange}
                        />
                        <TextField
                            id='password'
                            name='password'
                            placeholder='Password'
                            variant='outlined'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        <TextField
                            id='confirmPassword'
                            name='confirmPassword'
                            placeholder='Confirm password'
                            variant='outlined'
                            value={formik.values.confirmPasswrod}
                            onChange={formik.handleChange}
                        />
                        <Button
                            variant='contained'
                            className={style.confirmButton}
                            type='submit'
                            disabled={formik.isSubmitting}
                        >
                            Register
                        </Button>
                        <MUILink
                            className={style.helpLink}
                            href='/signin'
                            component={LinkBehaviour}
                        >
                            Already have an account
                        </MUILink>
                    </Stack>
                </form>
            </>
        </LoginLayout>
    );
};

export default SignIn;

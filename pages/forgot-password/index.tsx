import { Button, Link as MUILink, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import style from '../../styles/SignIn.module.css';
import { LinkBehaviour } from '../../src/Components/Common/LinkBehaviour';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import LoginLayout from '../../src/Components/Layouts/Login';

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
        <LoginLayout>
            <>
                <h2>
                    Enter email <br />
                    to recover password
                </h2>
                <form onSubmit={formik.handleSubmit}>
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
            </>
        </LoginLayout>
    );
};

export default SignIn;

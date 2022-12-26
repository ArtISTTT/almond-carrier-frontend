import { Button, Link as MUILink, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import style from '../../styles/SignIn.module.css';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { LinkBehaviour } from '../../src/Components/Common/LinkBehaviour';
import LoginLayout from '../../src/Components/Layouts/Login';
import { SigninSchema } from '../../src/schemas/SigninSchema';
import { signIn } from '../../src/api/auth';
import { useAppDispatch } from '../../src/redux/hooks';
import { addUserData } from '../../src/redux/slices/userSlice';

type IForm = {
    email: string;
    password: string;
};

const SignIn: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleSignIn = async (form: IForm) => {
        const data = await signIn(form);

        if (data.ok && data.user) {
            dispatch(addUserData(data.user));
            router.push('/carrier');
        }
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: handleSignIn,
        validationSchema: SigninSchema,
        validateOnBlur: false,
        validateOnChange: false,
    });

    return (
        <LoginLayout>
            <>
                <h2>Sign in</h2>
                <form onSubmit={formik.handleSubmit}>
                    <Stack direction='column' spacing={2}>
                        <TextField
                            id='email'
                            name='email'
                            type='email'
                            placeholder='Email'
                            variant='outlined'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.errors.email !== undefined}
                            helperText={formik.errors.email}
                        />
                        <TextField
                            id='password'
                            name='password'
                            type='password'
                            placeholder='Password'
                            variant='outlined'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.errors.password !== undefined}
                            helperText={formik.errors.password}
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
            </>
        </LoginLayout>
    );
};

export default SignIn;

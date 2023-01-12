import { Button, Link as MUILink, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useContext } from 'react';
import style from '../../styles/SignIn.module.css';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { LinkBehaviour } from '../../src/Components/Common/LinkBehaviour';
import LoginLayout from '../../src/Components/Layouts/Login';
import { SigninSchema } from '../../src/schemas/SigninSchema';
import { signIn } from '../../src/api/auth';
import { useAppDispatch } from '../../src/redux/hooks';
import { addUserData, setIsAuthorized } from '../../src/redux/slices/userSlice';
import { parseUserDataFromApi } from '../../src/helpers/parseUserDataFromApi';
import { OpenAlertContext } from '../../src/Components/Layouts/Snackbar';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

type IForm = {
    email: string;
    password: string;
};

const SignIn: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { triggerOpen } = useContext(OpenAlertContext);
    const handleSignIn = async (form: IForm) => {
        const data = await signIn(form);

        if (data.ok && data.user) {
            dispatch(addUserData(parseUserDataFromApi(data.user)));
            dispatch(setIsAuthorized(true));
            triggerOpen({
                severity: 'success',
                text: 'Successfully sign in',
            });
            router.push('/dashboard');
        } else {
            triggerOpen({
                severity: 'error',
                text: data.error || 'Error when trying to sign in',
            });
            formik.setSubmitting(false);
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
                <Typography variant='h2' component='h2'>
                    Sign in
                </Typography>
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
                            className={style.TextField}
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
                                Don&apos;t have an account?
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

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

export default SignIn;

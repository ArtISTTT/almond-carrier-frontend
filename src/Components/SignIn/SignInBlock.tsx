import React, { useContext } from 'react';
import style from '../../../styles/SignIn.module.css';
import { Button, Link as MUILink, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { navigateTo } from 'src/interfaces/navigate';
import { useTranslation } from 'react-i18next';
import { LinkBehaviour } from 'src/Components/Common/LinkBehaviour';
import { SigninSchema } from 'src/schemas/SigninSchema';
import { useFormik } from 'formik';
import { signIn } from 'src/api/auth';
import { useAppDispatch } from 'src/redux/hooks';
import { OpenAlertContext } from 'src/Components/Layouts/Snackbar';
import { parseUserDataFromApi } from 'src/helpers/parseUserDataFromApi';
import { useRouter } from 'next/router';
import { addUserData, setIsAuthorized } from 'src/redux/slices/userSlice';

type IForm = {
    email: string;
    password: string;
};

const SignInBlock = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const { triggerOpen } = useContext(OpenAlertContext);

    const handleSignIn = async (form: IForm) => {
        const data = await signIn(form);

        if (data.ok && data.user && !data.notVerified) {
            dispatch(addUserData(parseUserDataFromApi(data.user)));
            dispatch(setIsAuthorized(true));
            triggerOpen({
                severity: 'success',
                text: t('successSignIn'),
            });
            router.push(navigateTo.DASHBOARD);
        } else if (data.notVerified) {
            triggerOpen({
                severity: 'error',
                text: data.error || t('mailIsNotYetVerified'),
            });
            formik.setSubmitting(false);
        } else {
            triggerOpen({
                severity: 'error',
                text: data.error || t('errorSignIn'),
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
        <>
            <Typography
                className={style.fastLoginTitle}
                variant='h2'
                component='h2'
            >
                {t('signIn')}
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <Stack direction='column' spacing={2}>
                    <TextField
                        id='email'
                        name='email'
                        type='email'
                        placeholder={t('email') as string}
                        variant='outlined'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        className={style.loginInput}
                        error={formik.errors.email !== undefined}
                        helperText={
                            formik.errors.email &&
                            (t(formik.errors.email) as string)
                        }
                    />
                    <TextField
                        id='password'
                        name='password'
                        type='password'
                        placeholder={t('password') as string}
                        variant='outlined'
                        value={formik.values.password}
                        className={style.loginInput}
                        onChange={formik.handleChange}
                        error={formik.errors.password !== undefined}
                        helperText={
                            formik.errors.password &&
                            (t(formik.errors.password) as string)
                        }
                    />
                    <Button
                        variant='contained'
                        className={style.confirmButton}
                        type='submit'
                        disabled={formik.isSubmitting}
                    >
                        {t('signIn')}
                    </Button>
                    <Stack
                        direction='row'
                        spacing={2}
                        justifyContent='space-between'
                    >
                        <MUILink
                            className={style.helpLink}
                            href={navigateTo.SIGNUP}
                            component={LinkBehaviour}
                        >
                            {t('dontHaveAccount')}
                        </MUILink>
                        <MUILink
                            className={style.helpLink}
                            href={navigateTo.FORGOT_PASSWORD}
                            component={LinkBehaviour}
                        >
                            {t('forgotPassword')}
                        </MUILink>
                    </Stack>
                </Stack>
            </form>
        </>
    );
};

export default SignInBlock;

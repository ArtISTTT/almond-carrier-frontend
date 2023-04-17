import { Button, Link as MUILink, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import cn from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import { useFormik } from 'formik';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ConfirmEmail from 'src/Components/Verification/ConfirmEmail';
import { navigateTo } from 'src/interfaces/navigate';
import { signUp } from '../../src/api/auth';
import { LinkBehaviour } from '../../src/Components/Common/LinkBehaviour';
import LoginLayout from '../../src/Components/Layouts/Login';
import { OpenAlertContext } from '../../src/Components/Layouts/Snackbar';
import { SignupSchema } from '../../src/schemas/SignupSchema';
import style from '../../styles/SignIn.module.css';

type IForm = {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Dayjs;
};

const SignIn: React.FC = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const [isVerificationPopupOpen, setIsVerificationPopupOpen] =
        useState<string>('');
    const { triggerOpen } = useContext(OpenAlertContext);

    React.useEffect(() => {
        if (!router.isReady) return;

        if (
            typeof router.query.email === 'string' &&
            typeof router.query.lastName === 'string' &&
            typeof router.query.firstName === 'string'
        ) {
            formik.setValues({
                ...formik.values,
                email: router.query.email,
                lastName: router.query.lastName,
                firstName: router.query.firstName,
            });
        }
    }, [router.isReady]);

    const handleSignUp = async (form: IForm) => {
        const data = await signUp(form);

        if (data.ok && data.user?.email) {
            triggerOpen({
                severity: 'success',
                text: t('successSignUp'),
            });
            setIsVerificationPopupOpen(data.user?.email);
        } else {
            triggerOpen({
                severity: 'error',
                text: data.error || t('errorSignUp'),
            });
            formik.setSubmitting(false);
        }
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            dateOfBirth: dayjs().subtract(18, 'year'),
        },
        onSubmit: handleSignUp,
        validationSchema: SignupSchema,
        validateOnBlur: false,
        validateOnChange: false,
    });

    return (
        <LoginLayout>
            {isVerificationPopupOpen ? (
                <ConfirmEmail email={isVerificationPopupOpen} />
            ) : (
                <>
                    <Typography variant='h2' component='h2'>
                        {t('createYourAccount')}
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <Stack direction='column' spacing={2}>
                            <TextField
                                id='email'
                                name='email'
                                placeholder={t('email') as string}
                                variant='outlined'
                                value={formik.values.email}
                                className={cn(style.TextField, style.input)}
                                onChange={formik.handleChange}
                                error={formik.errors.email !== undefined}
                                helperText={
                                    formik.errors.email &&
                                    (t(formik.errors.email) as string)
                                }
                            />
                            <Stack
                                direction='row'
                                spacing={2}
                                className={style.TextField}
                            >
                                <TextField
                                    className={cn(style.input, style.nameInput)}
                                    id='firstName'
                                    name='firstName'
                                    placeholder={t('firstName') as string}
                                    variant='outlined'
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.errors.firstName !== undefined
                                    }
                                    helperText={
                                        formik.errors.firstName &&
                                        (t(formik.errors.firstName) as string)
                                    }
                                />
                                <TextField
                                    className={cn(style.input, style.nameInput)}
                                    id='lastName'
                                    name='lastName'
                                    placeholder={t('lastName') as string}
                                    variant='outlined'
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    error={formik.errors.lastName !== undefined}
                                    helperText={
                                        formik.errors.lastName &&
                                        (t(formik.errors.lastName) as string)
                                    }
                                />
                            </Stack>
                            <DesktopDatePicker
                                inputFormat='DD.MM.YYYY'
                                label={t('dateOfBirth') as string}
                                value={formik.values.dateOfBirth}
                                maxDate={dayjs().subtract(18, 'year')}
                                disableFuture={true}
                                onChange={value => {
                                    formik.setFieldValue('dateOfBirth', value);
                                }}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        id='dateOfBirth'
                                        name='dateOfBirth'
                                        variant='outlined'
                                        className={cn(
                                            style.dateInput,
                                            style.TextField
                                        )}
                                        error={
                                            formik.errors.dateOfBirth !==
                                            undefined
                                        }
                                        helperText={
                                            formik.errors.dateOfBirth &&
                                            t('mustBeYears')
                                        }
                                    />
                                )}
                            />
                            <TextField
                                id='password'
                                name='password'
                                type='password'
                                placeholder={t('password') as string}
                                variant='outlined'
                                className={style.TextField}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.errors.password !== undefined}
                                helperText={
                                    formik.errors.password &&
                                    (t(formik.errors.password) as string)
                                }
                            />
                            <TextField
                                id='confirmPassword'
                                name='confirmPassword'
                                type='password'
                                placeholder={t('confirmPassword') as string}
                                variant='outlined'
                                value={formik.values.confirmPassword}
                                className={style.TextField}
                                onChange={formik.handleChange}
                                error={
                                    formik.errors.confirmPassword !== undefined
                                }
                                helperText={
                                    formik.errors.confirmPassword &&
                                    (t(formik.errors.confirmPassword) as string)
                                }
                            />
                            <Typography
                                className={style.checkBoxTitle}
                                variant='body1'
                                component='p'
                            >
                                {t('clickingRegisterIAccept')}
                                <MUILink
                                    className={style.allowLink}
                                    href={navigateTo.PRIVACY_POLICY}
                                    component={LinkBehaviour}
                                >
                                    {t('privacyPolicity')}
                                </MUILink>{' '}
                                {t('and')}{' '}
                                <MUILink
                                    className={style.allowLink}
                                    href={navigateTo.USER_AGREEMENT}
                                    component={LinkBehaviour}
                                >
                                    {t('userAgreement')}
                                </MUILink>{' '}
                                {t('friendlyCarrier')}.
                            </Typography>

                            <Button
                                variant='contained'
                                className={style.confirmButton}
                                type='submit'
                                disabled={formik.isSubmitting}
                            >
                                {t('register')}
                            </Button>
                            <MUILink
                                className={style.helpLink}
                                href={navigateTo.SIGNIN}
                                component={LinkBehaviour}
                            >
                                {t('alreadyHaveAnAccount')}
                            </MUILink>
                        </Stack>
                    </form>
                </>
            )}
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

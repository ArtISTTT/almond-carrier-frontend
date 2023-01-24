import { Button, TextField, Link as MUILink, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useContext } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { LinkBehaviour } from '../../src/Components/Common/LinkBehaviour';
import LoginLayout from '../../src/Components/Layouts/Login';
import { SignupSchema } from '../../src/schemas/SignupSchema';
import style from '../../styles/SignIn.module.css';
import { signUp } from '../../src/api/auth';
import { addUserData, setIsAuthorized } from '../../src/redux/slices/userSlice';
import { useAppDispatch } from '../../src/redux/hooks';
import { parseUserDataFromApi } from '../../src/helpers/parseUserDataFromApi';
import { OpenAlertContext } from '../../src/Components/Layouts/Snackbar';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { navigateTo } from 'src/interfaces/navigate';

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
    const dispatch = useAppDispatch();

    const { triggerOpen } = useContext(OpenAlertContext);

    React.useEffect(() => {
        if (!router.isReady) return;

        if (typeof router.query.email === 'string') {
            formik.setValues({ ...formik.values, email: router.query.email });
        }
    }, [router.isReady]);

    const handleSignUp = async (form: IForm) => {
        const data = await signUp(form);

        if (data.ok && data.user) {
            dispatch(addUserData(parseUserDataFromApi(data.user)));
            dispatch(setIsAuthorized(true));
            triggerOpen({
                severity: 'success',
                text: t('successSignUp'),
            });
            router.push(navigateTo.THANKS_FOR_REGISTRATION);
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
                            className={style.TextField}
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
                                error={formik.errors.firstName !== undefined}
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
                                        formik.errors.dateOfBirth !== undefined
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
                            error={formik.errors.confirmPassword !== undefined}
                            helperText={
                                formik.errors.confirmPassword &&
                                (t(formik.errors.confirmPassword) as string)
                            }
                        />
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
                            {t('AlreadyHaveAnAccount')}
                        </MUILink>
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

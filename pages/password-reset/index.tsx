import { Button, Link as MUILink, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import LoginLayout from '../../src/Components/Layouts/Login';

import style from '../../styles/SignIn.module.css';
import { processRecoverPassword } from '../../src/api/auth';
import { RecoverPasswordSchema } from '../../src/schemas/RecoverPasswordSchema';
import { OpenAlertContext } from '../../src/Components/Layouts/Snackbar';
import Loader from '../../src/Components/Loader';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import { navigateTo } from 'src/interfaces/navigate';

type IForm = {
    password: string;
    confirmPassword: string;
    token: string;
    userId: string;
};

const SignIn: React.FC = () => {
    const router = useRouter();
    const { t } = useTranslation();

    const { token, id } = router.query;

    const { triggerOpen } = useContext(OpenAlertContext);

    React.useEffect(() => {
        if (!router.isReady) return;

        if (router.isReady && (!token || !id)) {
            router.push(navigateTo.LANDING);
        }

        formik.setValues({
            ...formik.values,
            token: token as string,
            userId: id as string,
        });
    }, [router.isReady]);

    const handleRecover = async (form: IForm) => {
        const data = await processRecoverPassword({
            password: form.password,
            userId: form.userId,
            token: form.token,
        });

        if (data.ok) {
            triggerOpen({
                severity: 'success',
                text: t('passSuccessfullyUpdated'),
            });

            router.push(navigateTo.SIGNIN);
        } else {
            triggerOpen({
                severity: 'error',
                text: data.error || t('errorUpdatePassword'),
            });
            formik.setSubmitting(false);
        }
    };

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
            userId: '',
            token: '',
        },
        onSubmit: handleRecover,
        validationSchema: RecoverPasswordSchema,
        validateOnBlur: false,
        validateOnChange: false,
    });

    if (router.isReady && (!token || !id)) {
        return <Loader />;
    }

    return (
        <LoginLayout>
            <>
                <Typography variant='h2' component='h2'>
                    {t('setupNewPassword')}
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Stack direction='column' spacing={2}>
                        <TextField
                            id='password'
                            name='password'
                            type='password'
                            placeholder={t('password') as string}
                            variant='outlined'
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
                            {t('restorePass')}
                        </Button>
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

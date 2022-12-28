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

type IForm = {
    password: string;
    confirmPassword: string;
    token: string;
    userId: string;
};

const SignIn: React.FC = () => {
    const router = useRouter();

    const { token, id } = router.query;

    const { triggerOpen } = useContext(OpenAlertContext);

    React.useEffect(() => {
        if (!router.isReady) return;

        if (router.isReady && (!token || !id)) {
            router.push('/');
        }

        formik.setValues({
            ...formik.values,
            token: token as string,
            userId: id as string,
        });
    }, [router.isReady]);

    const handleRecover = (form: IForm) => {
        processRecoverPassword({
            password: form.password,
            userId: form.userId,
            token: form.token,
        })
            .then(data => {
                if (data.ok) {
                    triggerOpen({
                        severity: 'success',
                        text: 'Password successfully changed',
                    });

                    router.push('/signin');
                } else {
                    triggerOpen({
                        severity: 'error',
                        text:
                            data.error ||
                            'Error when trying to change the password',
                    });
                    formik.setSubmitting(false);
                }
            })
            .catch(error => {});
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
                    Set up new password
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Stack direction='column' spacing={2}>
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
                        <TextField
                            id='confirmPassword'
                            name='confirmPassword'
                            type='password'
                            placeholder='Confirm password'
                            variant='outlined'
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            error={formik.errors.confirmPassword !== undefined}
                            helperText={formik.errors.confirmPassword}
                        />
                        <Button
                            variant='contained'
                            className={style.confirmButton}
                            type='submit'
                            disabled={formik.isSubmitting}
                        >
                            Restore password
                        </Button>
                    </Stack>
                </form>
            </>
        </LoginLayout>
    );
};

export default SignIn;

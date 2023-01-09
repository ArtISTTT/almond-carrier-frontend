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

type IForm = {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
};

const SignIn: React.FC = () => {
    const router = useRouter();
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
                text: 'Successfully sign up',
            });
            router.push('/thanks-for-registration');
        } else {
            triggerOpen({
                severity: 'error',
                text: data.error || 'Error when trying to sign up',
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
            dateOfBirth: new Date(),
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
                    Create your account for free!
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Stack direction='column' spacing={2}>
                        <TextField
                            id='email'
                            name='email'
                            placeholder='Email'
                            variant='outlined'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.errors.email !== undefined}
                            helperText={formik.errors.email}
                        />
                        <Stack direction='row' spacing={2}>
                            <TextField
                                className={cn(style.input, style.nameInput)}
                                id='firstName'
                                name='firstName'
                                placeholder='First Name'
                                variant='outlined'
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                error={formik.errors.firstName !== undefined}
                                helperText={formik.errors.firstName}
                            />
                            <TextField
                                className={cn(style.input, style.nameInput)}
                                id='lastName'
                                name='lastName'
                                placeholder='Last Name'
                                variant='outlined'
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                error={formik.errors.lastName !== undefined}
                                helperText={formik.errors.lastName}
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
                            error={formik.errors.dateOfBirth !== undefined}
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

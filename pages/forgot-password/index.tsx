import { Button, Link as MUILink, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import { LinkBehaviour } from '../../src/Components/Common/LinkBehaviour';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import LoginLayout from '../../src/Components/Layouts/Login';
import { EmailSchema } from '../../src/schemas/EmailSchema';

import style from '../../styles/SignIn.module.css';
import { recoverPassword } from '../../src/api/auth';

type IForm = {
    email: string;
};

const SignIn: React.FC = () => {
    const router = useRouter();

    const handleRecover = (form: IForm) => {
        recoverPassword(form).then(() => console.log('Wait...'));
    };

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: handleRecover,
        validationSchema: EmailSchema,
        validateOnBlur: false,
        validateOnChange: false,
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
                            error={formik.errors.email !== undefined}
                            helperText={formik.errors.email}
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

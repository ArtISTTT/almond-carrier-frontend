import { Button, Container, TextField } from '@mui/material';
import styles from '../../styles/Footer.module.css';
import React from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { EmailSchema } from '../schemas/EmailSchema';

type IForm = {
    email: string;
};

const Footer = () => {
    const router = useRouter();

    const handleSubmit = (form: IForm) => {
        router.push({
            pathname: '/signup',
            query: { email: form.email },
        });
    };

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: handleSubmit,
        validationSchema: EmailSchema,
        validateOnBlur: false,
        validateOnChange: false,
    });

    return (
        <footer className={styles.footer}>
            <Container className={styles.container} maxWidth={false}>
                <div className={styles.content}>
                    <div className={styles.emailBlock}>
                        <span>Registration</span>
                        <form
                            className={styles.form}
                            onSubmit={formik.handleSubmit}
                            action='submit'
                        >
                            <TextField
                                id='email'
                                name='email'
                                variant='outlined'
                                placeholder='Email'
                                color='primary'
                                className={styles.emailInput}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.errors.email !== undefined}
                                helperText={formik.errors.email}
                            />
                            <Button
                                type='submit'
                                color='primary'
                                disabled={formik.isSubmitting}
                                className={styles.button}
                                variant='contained'
                            >
                                Register Now
                            </Button>
                        </form>
                    </div>
                    <div className={styles.contactsBlock}>
                        <span>Contacts</span>
                        <ul className={styles.contactLinks}>
                            <li>
                                <div>Inst</div>
                                <span>@</span>
                            </li>
                            <li>
                                <div>VK</div>
                                <span>@</span>
                            </li>
                            <li>
                                <div>Gmail</div>
                                <span>@</span>
                            </li>
                            <li>
                                <div>YouTube</div>
                                <span>@</span>
                            </li>
                            <li>
                                <div>What's Up</div>
                                <span>@</span>
                            </li>
                            <li>
                                <div>OK</div>
                                <span>@</span>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.navigationBlock}>
                        <span>Navigation</span>
                        <div>
                            <div className={styles.navigationLink}>Carrier</div>
                            <div className={styles.navigationLink}>
                                Accepter
                            </div>
                            <div className={styles.navigationLink}>Rules</div>
                            <div className={styles.navigationLink}>
                                About us
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.information}>
                    Friendly Carrier 2021. <span>All Rights Reserved.</span>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;

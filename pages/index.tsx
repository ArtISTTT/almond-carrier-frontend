import styles from '../styles/WelcomePage.module.css';
import { Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { EmailSchema } from '../src/schemas/EmailSchema';
import PrivateLayout from '../src/Components/Layouts/Private';
import { privateTypes } from '../src/interfaces/private';
import MainLayout from '../src/Components/Layouts/MainLayout';

type IForm = {
    email: string;
};

export default function Welcome() {
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
        <PrivateLayout privateType={privateTypes.all}>
            <MainLayout
                showContinueIfAuthorized={true}
                showSignInOutIfUnauthorized={true}
            >
                <div className={styles.banner}>
                    <Typography
                        variant='h1'
                        component='h1'
                        className={styles.title}
                    >
                        Friendly Carrier
                    </Typography>
                    <Typography
                        variant='h3'
                        component='h3'
                        className={styles.description}
                    >
                        Company that unites people all over the world. If you
                        need anything what you<br></br> don’t have in your
                        country, just ask another person to carry it to you in
                        our app
                    </Typography>
                    <div className={styles.fastSignUp}>
                        <form onSubmit={formik.handleSubmit} action='submit'>
                            <TextField
                                id='email'
                                name='email'
                                variant='outlined'
                                color='primary'
                                placeholder='Email'
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
                                className={styles.submitButton}
                                variant='contained'
                            >
                                Register Now
                            </Button>
                        </form>
                    </div>
                </div>
                <div className={styles.rolesWrapper}>
                    <div className={styles.roleBlock}>
                        <Typography
                            variant='h2'
                            component='h2'
                            className={styles.rolesTitle}
                        >
                            Possible roles
                        </Typography>
                        <div className={styles.possibleRoles}>
                            <div className={styles.role}>
                                <img
                                    className={styles.roleLeft}
                                    src='/static/images/main-page/carrier.png'
                                    alt='man1'
                                />
                                <div className={styles.roleInfo}>
                                    <Typography
                                        variant='h3'
                                        component='h3'
                                        className={styles.roleTitle}
                                    >
                                        Carrier
                                    </Typography>
                                    <Typography
                                        variant='h4'
                                        component='h4'
                                        className={styles.roleDescription}
                                    >
                                        You want to visit another country, then
                                        you can deliver what is needed, from
                                        where you are leaving, to the country
                                        where you are going. By completing
                                        orders you earn some money.
                                    </Typography>
                                </div>
                            </div>
                            <div className={styles.role}>
                                <img
                                    className={styles.roleRight}
                                    src='/static/images/main-page/receiver.png'
                                    alt='man2'
                                />
                                <div className={styles.roleInfo}>
                                    <Typography
                                        variant='h3'
                                        component='h3'
                                        className={styles.roleTitle}
                                    >
                                        Receiver
                                    </Typography>
                                    <Typography
                                        variant='h4'
                                        component='h4'
                                        className={styles.roleDescription}
                                    >
                                        You are in a country where you don't
                                        have anything you need. Then you can
                                        request something and wait for the
                                        carrier to respond or respond to the
                                        carrier's offer yourself.
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.stepsWrapper}>
                    <Typography
                        variant='h2'
                        component='h2'
                        className={styles.stepsTitle}
                    >
                        How does it work
                    </Typography>
                    <div className={styles.stepsBlock}>
                        <img
                            className={styles.stepOne}
                            src='/static/images/main-page/step-one.png'
                            alt='qwe'
                        />
                        <img
                            className={styles.stepTwo}
                            src='/static/images/main-page/step-two.png'
                            alt='qwe'
                        />
                        <img
                            className={styles.stepThree}
                            src='/static/images/main-page/step-three.png'
                            alt='qwe'
                        />
                    </div>
                </div>
                <div className={styles.advantagesBlock}>
                    <Typography
                        variant='h2'
                        component='h2'
                        className={styles.advantagesTitle}
                    >
                        Our advantages
                    </Typography>
                    <div className={styles.advantages}>
                        <div className={styles.advantage}>
                            <img
                                src='/static/images/main-page/advantage-one.png'
                                alt=''
                            />
                            <div className={styles.advantageText}>
                                <Typography
                                    variant='h3'
                                    component='h3'
                                    className={styles.advantageTitle}
                                >
                                    Reliability
                                </Typography>
                                <Typography
                                    variant='h5'
                                    component='h5'
                                    className={styles.advantageDescription}
                                >
                                    Receiver gives us money, then we hold them
                                    until receiver doesn’t approve that he got
                                    goods. After that we send money to carrier.
                                </Typography>
                            </div>
                        </div>
                        <div className={styles.advantage}>
                            <img
                                src='/static/images/main-page/advantage-two.png'
                                alt=''
                            />
                            <div className={styles.advantageText}>
                                <Typography
                                    variant='h3'
                                    component='h3'
                                    className={styles.advantageTitle}
                                >
                                    Safety
                                </Typography>
                                <Typography
                                    variant='h5'
                                    component='h5'
                                    className={styles.advantageDescription}
                                >
                                    All your data will be confident. Your money
                                    also will be safe.
                                </Typography>
                            </div>
                        </div>
                        <div className={styles.advantage}>
                            <img
                                src='/static/images/main-page/advantage-three.png'
                                alt=''
                            />
                            <div className={styles.advantageText}>
                                <Typography
                                    variant='h3'
                                    component='h3'
                                    className={styles.advantageTitle}
                                >
                                    Low commission
                                </Typography>
                                <Typography
                                    variant='h5'
                                    component='h5'
                                    className={styles.advantageDescription}
                                >
                                    We charge a commission for what we found for
                                    your carrier/receiver, but the price will be
                                    low.
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </PrivateLayout>
    );
}

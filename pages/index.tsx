import styles from '../styles/WelcomePage.module.css';
import { Button, TextField } from '@mui/material';
import Layout from '../src/Components/Layouts/Welcome';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { EmailSchema } from '../src/schemas/EmailSchema';

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
        <Layout>
            <div className={styles.banner}>
                <div className={styles.title}>Friendly Carrier</div>
                <div className={styles.description}>
                    Company that unites people all over the world. If you need
                    anything what you don’t have in your country, just ask
                    another person to carry it to you in our app
                </div>
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
                    <div className={styles.rolesTitle}>Possible roles</div>
                    <div className={styles.possibleRoles}>
                        <div className={styles.role}>
                            <img
                                className={styles.roleLeft}
                                src='/static/images/main-page/carrier.png'
                                alt='man1'
                            />
                            <div className={styles.roleInfo}>
                                <h3 className={styles.roleTitle}>Carrier</h3>
                                <div className={styles.roleDescription}>
                                    You want to visit another country, then you
                                    can deliver what is needed, from where you
                                    are leaving, to the country where you are
                                    going. By completing orders you earn some
                                    money.
                                </div>
                            </div>
                        </div>
                        <div className={styles.role}>
                            <img
                                className={styles.roleRight}
                                src='/static/images/main-page/receiver.png'
                                alt='man2'
                            />
                            <div className={styles.roleInfo}>
                                <h3 className={styles.roleTitle}>Receiver</h3>
                                <div className={styles.roleDescription}>
                                    You are in a country where you don't have
                                    anything you need. Then you can request
                                    something and wait for the carrier to
                                    respond or respond to the carrier's offer
                                    yourself.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.stepsWrapper}>
                <div className={styles.stepsTitle}>How does it work</div>
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
                <div className={styles.advantagesTitle}>Our advantages</div>
                <div className={styles.advantages}>
                    <div className={styles.advantage}>
                        <img
                            src='/static/images/main-page/advantage-one.png'
                            alt=''
                        />
                        <div className={styles.advantageText}>
                            <h3 className={styles.advantageTitle}>
                                Reliability
                            </h3>
                            <span className={styles.advantageDescription}>
                                Receiver gives us money, then we hold them until
                                receiver doesn’t approve that he got goods.
                                After that we send money to carrier.
                            </span>
                        </div>
                    </div>
                    <div className={styles.advantage}>
                        <img
                            src='/static/images/main-page/advantage-two.png'
                            alt=''
                        />
                        <div className={styles.advantageText}>
                            <h3 className={styles.advantageTitle}>Safety</h3>
                            <span className={styles.advantageDescription}>
                                All your data will be confident. Your money also
                                will be safe.
                            </span>
                        </div>
                    </div>
                    <div className={styles.advantage}>
                        <img
                            src='/static/images/main-page/advantage-three.png'
                            alt=''
                        />
                        <div className={styles.advantageText}>
                            <h3 className={styles.advantageTitle}>
                                Low commission
                            </h3>
                            <span className={styles.advantageDescription}>
                                We charge a commission for what we found for
                                your carrier/receiver, but the price will be low
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

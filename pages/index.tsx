import styles from '../styles/WelcomePage.module.css';
import { Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { EmailSchema } from '../src/schemas/EmailSchema';
import PrivateLayout from '../src/Components/Layouts/Private';
import { privateTypes } from '../src/interfaces/private';
import MainLayout from '../src/Components/Layouts/MainLayout';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

type IForm = {
    email: string;
};

export default function Welcome() {
    const router = useRouter();
    const { t } = useTranslation();

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
                        {t('friendlyCarrier')}
                    </Typography>
                    <Typography
                        variant='h3'
                        component='h2'
                        className={styles.description}
                    >
                        {t('companyThatUnitesPeopleETC')}
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
                                {t('registerNow')}
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
                            {t('possibleRoles')}
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
                                        {t('carrier')}
                                    </Typography>
                                    <Typography
                                        variant='h4'
                                        component='h4'
                                        className={styles.roleDescription}
                                    >
                                        {t('ifYouWantToVisitAnotherCountry')}
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
                                        {t('receiver')}
                                    </Typography>
                                    <Typography
                                        variant='h4'
                                        component='h4'
                                        className={styles.roleDescription}
                                    >
                                        {t('ifYouAreInTheCountry')}
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
                        {t('howDoesItWork')}
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
                        {t('ourAdvantages')}
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
                                    {t('reliability')}
                                </Typography>
                                <Typography
                                    variant='h5'
                                    component='h4'
                                    className={styles.advantageDescription}
                                >
                                    {t('theRecipientPaysForThePackage')}
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
                                    {t('safety')}
                                </Typography>
                                <Typography
                                    variant='h5'
                                    component='h4'
                                    className={styles.advantageDescription}
                                >
                                    {t('yourAllDataWillBe')}
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
                                    {t('lowCommission')}
                                </Typography>
                                <Typography
                                    variant='h5'
                                    component='h4'
                                    className={styles.advantageDescription}
                                >
                                    {t('weChargeACommissionFor')}
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </PrivateLayout>
    );
}

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

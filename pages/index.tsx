import styles from '../styles/WelcomePage.module.css';
import { Button, TextField, Typography } from '@mui/material';
import cn from 'classnames';
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
                        <div className={styles.stepOne}>
                            <Typography
                                className={styles.stepOneTitle}
                                variant='h3'
                                component='h3'
                            >
                                1. Choose
                            </Typography>
                            <div className={styles.stepOneText}>
                                <Typography
                                    className={styles.stepOneTextPart}
                                    variant='body1'
                                    component='p'
                                >
                                    If you are a receiver, than you need to
                                    choose carrier, who will buy you a good you
                                    need.
                                </Typography>
                                <Typography
                                    className={cn(
                                        styles.stepOneTextPart,
                                        styles.stepOneTextPartTwo
                                    )}
                                    variant='body1'
                                    component='p'
                                >
                                    If you are a carrier, you need to choose a
                                    receiver to deliver a good.
                                </Typography>
                            </div>
                        </div>
                        <div className={styles.stepTwo}>
                            <Typography
                                className={styles.stepTwoTitle}
                                variant='h3'
                                component='h3'
                            >
                                2. Purchase
                            </Typography>
                            <div className={styles.stepOneText}>
                                <Typography
                                    className={styles.stepTwoTextPart}
                                    variant='body1'
                                    component='p'
                                >
                                    Carrier points the price of good, then to
                                    the result sum added our commission and
                                    profit for carrier. Receiver pays the sum.
                                </Typography>
                                <Typography
                                    className={cn(
                                        styles.stepTwoTextPart,
                                        styles.stepTwoTextPartTwo
                                    )}
                                    variant='body1'
                                    component='p'
                                >
                                    We hold it on our servers.
                                    <br /> Carrier buys a good
                                    <br /> himself, after he sees that
                                    <br /> the sum is in the cloud
                                </Typography>
                            </div>
                        </div>
                        <div className={styles.stepThree}>
                            <Typography
                                className={styles.stepThreeTitle}
                                variant='h3'
                                component='h3'
                            >
                                3. Receiving
                            </Typography>
                            <Typography
                                className={styles.stepThreeText}
                                variant='body1'
                                component='p'
                            >
                                Carrier brings the good to the country where
                                receiver lives. Then if receiver sees that the
                                good is suitable for him, he proves it in the
                                app, and carrier gets his money.
                            </Typography>
                        </div>
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

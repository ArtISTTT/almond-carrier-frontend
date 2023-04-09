import { Button, TextField, Typography } from '@mui/material';
import cn from 'classnames';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { navigateTo } from 'src/interfaces/navigate';
import { selectIsAuthorized } from 'src/redux/selectors/user';
import { FastSignupSchema } from 'src/schemas/FastSignUpSchema';
import MainLayout from '../src/Components/Layouts/MainLayout';
import PrivateLayout from '../src/Components/Layouts/Private';
import { privateTypes } from '../src/interfaces/private';
import styles from '../styles/WelcomePage.module.css';

type IForm = {
    firstName: string;
    lastName: string;
    email: string;
};

export default function Welcome() {
    const { t } = useTranslation();
    const router = useRouter();
    const isAuthorized = useSelector(selectIsAuthorized);
    const payoutRef = React.useRef<null | HTMLDivElement>(null);

    const fastSignUpNavigate = (form: IForm) => {
        router.push({
            pathname: navigateTo.SIGNUP,
            query: {
                email: form.email,
                lastName: form.lastName,
                firstName: form.firstName,
            },
        });
    };

    const scrollToFastSignUp = () => {
        payoutRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
        },
        onSubmit: fastSignUpNavigate,
        validationSchema: FastSignupSchema,
    });

    console.log(t('findAPersonWhoCan'));

    return (
        <PrivateLayout privateType={privateTypes.all}>
            <MainLayout
                showContinueIfAuthorized={true}
                showSignInOutIfUnauthorized={true}
            >
                <Head>
                    <title>Friendly carrier - P2P delivery platform</title>
                    <meta
                        name='description'
                        content={
                            t(
                                'P2PPlatformDeliverGoodsAnywhereInTheWorld'
                            ) as string
                        }
                    />
                    <meta
                        property='og:title'
                        content={
                            t('friendlyCarrierP2PDeliveryPlatform') as string
                        }
                    />
                    <meta
                        property='og:description'
                        content={
                            t('orderAnyProductFromAnywhereInTheWorld') as string
                        }
                    />
                    <meta
                        property='og:url'
                        content='https://friendlycarrier.com/'
                    />
                    <meta property='og:type' content='website' />
                    <meta
                        property='v:url'
                        content='https://friendlycarrier.com/'
                    />
                </Head>
                <div className={styles.banner}>
                    <div className={styles.bannerContent}>
                        <Typography
                            variant='h1'
                            component='h1'
                            className={styles.bannerTitle}
                            dangerouslySetInnerHTML={{
                                __html: t('findAPersonWhoCan'),
                            }}
                        ></Typography>
                        <img
                            className={styles.bannerLogo}
                            src='static/images/main-page/new-landing-plane.png'
                        />
                    </div>
                    <img
                        className={styles.bannerTopLine}
                        src='static/images/main-page/banner-top-line.png'
                    />
                    <img
                        className={styles.bannerBottomLine}
                        src='static/images/main-page/banner-bottom-line.png'
                    />
                    {!isAuthorized && (
                        <div className={styles.fastSignUp}>
                            <Button
                                color='primary'
                                onClick={scrollToFastSignUp}
                                className={styles.submitButton}
                                variant='contained'
                            >
                                {t('registerNow')}
                            </Button>
                        </div>
                    )}
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
                            <motion.div
                                initial={{ x: -100, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 1.2 }}
                                viewport={{ once: true }}
                            >
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
                                            {t(
                                                'ifYouWantToVisitAnotherCountry'
                                            )}
                                        </Typography>
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ x: 100, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 1.2 }}
                                viewport={{ once: true }}
                            >
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
                                            {t('orderWhatYouNeed')}
                                        </Typography>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                        <img
                            className={styles.rolesLogo}
                            src='static/images/main-page/blue-landing-plane.png'
                        />
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
                    {/* <Typography
                        variant='h2'
                        component='h2'
                        className={styles.stepsSubTitle}
                    >
                        {t('youCanCreateOwnOrdersOrRespondExistingOnes')}
                    </Typography> */}
                    <div className={styles.steps}>
                        <div className={styles.leftSteps}>
                            <div
                                className={cn(
                                    styles.stepBlock,
                                    styles.firstStep
                                )}
                            >
                                <Typography
                                    variant='h5'
                                    component='h5'
                                    className={styles.stepTitle}
                                >
                                    {t('oneChoose')}
                                </Typography>
                                <div className={styles.firstStepText}>
                                    <Typography
                                        variant='body1'
                                        component='p'
                                        className={styles.stepText}
                                    >
                                        <span>{t('respond')}</span>:{' '}
                                        {t('oneIfYouReceiver')}
                                    </Typography>
                                    <Typography
                                        variant='body1'
                                        component='p'
                                        className={styles.stepText}
                                    >
                                        <span>{t('create')}</span>:{' '}
                                        {t('oneIfYouCarrier')}
                                    </Typography>
                                </div>
                            </div>
                            <div
                                className={cn(
                                    styles.stepBlock,
                                    styles.thirdStep
                                )}
                            >
                                <Typography
                                    variant='h5'
                                    component='h5'
                                    className={styles.stepTitle}
                                >
                                    {t('details')}
                                </Typography>
                                <Typography
                                    variant='body1'
                                    component='p'
                                    className={styles.stepText}
                                >
                                    {t('priceSum')}
                                </Typography>
                            </div>
                        </div>
                        <div className={styles.stepsPlanes}>
                            <img
                                className={styles.stepsPlane}
                                src='static/images/main-page/new-landing-plane.png'
                            />
                            <img
                                className={styles.stepsPlane}
                                src='static/images/main-page/new-landing-plane.png'
                            />
                            <img
                                className={styles.stepsPlane}
                                src='static/images/main-page/new-landing-plane.png'
                            />
                        </div>
                        <div className={styles.rightSteps}>
                            <div
                                className={cn(
                                    styles.stepBlock,
                                    styles.secondStep
                                )}
                            >
                                <Typography
                                    variant='h5'
                                    component='h5'
                                    className={styles.stepTitle}
                                >
                                    {t('paymentDelivery')}
                                </Typography>
                                <Typography
                                    variant='body1'
                                    component='p'
                                    className={styles.stepText}
                                >
                                    {t(
                                        'recipientPaysForTheGoodsAndThenTheCarrierDelivers'
                                    )}
                                </Typography>
                            </div>
                            <div
                                className={cn(
                                    styles.stepBlock,
                                    styles.fourStep
                                )}
                            >
                                <Typography
                                    variant='h5'
                                    component='h5'
                                    className={styles.stepTitle}
                                >
                                    {t('result')}
                                </Typography>
                                <Typography
                                    variant='body1'
                                    component='p'
                                    className={styles.stepText}
                                >
                                    {t(
                                        'recipientConfirmsReceiptAndTheCarrierGetsReward'
                                    )}
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <img
                        className={styles.stepsIcon}
                        src='static/images/main-page/white-landing-plane.png'
                    />
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
                            <div
                                className={cn(
                                    styles.advantageText,
                                    styles.advantageTextAnotherColor
                                )}
                            >
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
                                    {t(
                                        'AllMoneyStoredOurAccountsAndWillBeRefunded'
                                    )}
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
                    <img
                        className={styles.advantagesLogo}
                        src='static/images/main-page/blue-landing-plane.png'
                    />
                </div>
                {!isAuthorized && (
                    <div ref={payoutRef} className={styles.formWrapper}>
                        <div className={styles.formBlcok}>
                            <Typography
                                variant='h4'
                                component='h4'
                                className={styles.formTitle}
                            >
                                {t('getStartedNow')}
                            </Typography>
                            <form
                                className={styles.form}
                                onSubmit={formik.handleSubmit}
                            >
                                <div className={styles.formFirstLastName}>
                                    <TextField
                                        id='firstName'
                                        name='firstName'
                                        type='text'
                                        placeholder={t('firstName') as string}
                                        variant='standard'
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.errors.firstName !==
                                            undefined
                                        }
                                        helperText={
                                            formik.errors.firstName &&
                                            (t(
                                                formik.errors.firstName
                                            ) as string)
                                        }
                                        InputProps={{
                                            disableUnderline: true,
                                        }}
                                        className={styles.formInput}
                                    />
                                    <TextField
                                        id='lastName'
                                        name='lastName'
                                        type='text'
                                        placeholder={t('lastName') as string}
                                        variant='standard'
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.errors.lastName !== undefined
                                        }
                                        helperText={
                                            formik.errors.lastName &&
                                            (t(
                                                formik.errors.lastName
                                            ) as string)
                                        }
                                        InputProps={{
                                            disableUnderline: true,
                                        }}
                                        className={styles.formInput}
                                    />
                                </div>
                                <TextField
                                    id='email'
                                    name='email'
                                    type='text'
                                    placeholder={t('email') as string}
                                    variant='standard'
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.errors.email !== undefined}
                                    helperText={
                                        formik.errors.email &&
                                        (t(formik.errors.email) as string)
                                    }
                                    className={styles.formEmailInput}
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                />
                                <Button
                                    variant='contained'
                                    className={styles.formConfirmButton}
                                    type='submit'
                                    disabled={formik.isSubmitting}
                                >
                                    {t('signUp')}
                                </Button>
                            </form>
                            <img
                                className={styles.formStepsIcon}
                                src='static/images/main-page/new-landing-plane.png'
                            />
                        </div>
                    </div>
                )}
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

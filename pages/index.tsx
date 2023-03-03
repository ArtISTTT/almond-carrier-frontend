import styles from '../styles/WelcomePage.module.css';
import React from 'react';
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
import { navigateTo } from 'src/interfaces/navigate';
import Head from 'next/head';

type IForm = {
    email: string;
};

export default function Welcome() {
    const router = useRouter();
    const { t } = useTranslation();

    const handleSubmit = (form: IForm) => {
        router.push({
            pathname: navigateTo.SIGNUP,
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
        <>
            <Head>
                <title>Friendly carrier - P2P delivery platform</title>
                <meta
                    name='description'
                    content='P2P platform to deliver goods anywhere in the world'
                />
                <meta
                    property='og:title'
                    content='Friendly carrier - P2P delivery platform'
                />
                <meta
                    property='og:description'
                    content='Order any product from anywhere in the world'
                />
                <meta
                    property='og:url'
                    content='https://friendlycarrier.com/'
                />
                <meta
                    property='og:image'
                    content='/static/images/main-page/background2.png'
                />
                <meta property='og:type' content='website' />
            </Head>
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
                            <form
                                className={styles.form}
                                onSubmit={formik.handleSubmit}
                                action='submit'
                            >
                                <TextField
                                    id='email'
                                    name='email'
                                    variant='outlined'
                                    color='primary'
                                    placeholder={t('email') as string}
                                    className={styles.emailInput}
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.errors.email !== undefined}
                                    helperText={
                                        formik.errors.email &&
                                        (t(formik.errors.email) as string)
                                    }
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
                                            {t(
                                                'ifYouWantToVisitAnotherCountry'
                                            )}
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
                            <div className={styles.stepBlock}>
                                <div
                                    className={cn(
                                        styles.leftPart,
                                        styles.stepPart
                                    )}
                                >
                                    <div className={styles.leftPartContent}>
                                        <img
                                            className={styles.stepImage}
                                            src='/static/images/main-page/choose.png'
                                            alt='choose'
                                        />
                                    </div>
                                </div>
                                <div
                                    className={cn(
                                        styles.rightPart,
                                        styles.stepPart
                                    )}
                                >
                                    <Typography
                                        variant='h3'
                                        component='h3'
                                        className={styles.stepTitle}
                                    >
                                        {t('oneChoose')}
                                    </Typography>
                                    <div className={styles.stepsText}>
                                        <Typography
                                            className={styles.stepText}
                                            variant='body1'
                                            component='p'
                                        >
                                            {t('oneIfYouReceiver')}
                                        </Typography>
                                        <Typography
                                            className={styles.stepText}
                                            variant='body1'
                                            component='p'
                                        >
                                            {t('oneIfYouCarrier')}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={cn(
                                    styles.stepBlock,
                                    styles.stepBlockReverse
                                )}
                            >
                                <div
                                    className={cn(
                                        styles.leftPart,
                                        styles.stepPart
                                    )}
                                >
                                    <div className={styles.leftPartContent}>
                                        <img
                                            className={styles.stepImage}
                                            src='/static/images/main-page/purchase.png'
                                            alt='purchase'
                                        />
                                    </div>
                                </div>
                                <div
                                    className={cn(
                                        styles.rightPart,
                                        styles.stepPart,
                                        styles.stepPartReverse
                                    )}
                                >
                                    <Typography
                                        variant='h3'
                                        component='h3'
                                        className={cn(
                                            styles.stepTitle,
                                            styles.stepTitleRight
                                        )}
                                    >
                                        {t('purchase')}
                                    </Typography>
                                    <div className={styles.stepsText}>
                                        <Typography
                                            className={styles.stepText}
                                            variant='body1'
                                            component='p'
                                        >
                                            {t('priceSum')}
                                        </Typography>
                                        <Typography
                                            className={styles.stepText}
                                            variant='body1'
                                            component='p'
                                        >
                                            {t('holdMoney')}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.stepBlock}>
                                <div
                                    className={cn(
                                        styles.leftPart,
                                        styles.stepPart
                                    )}
                                >
                                    <div className={styles.leftPartContent}>
                                        <img
                                            className={styles.stepImage}
                                            src='/static/images/main-page/receiving.png'
                                            alt='choose'
                                        />
                                    </div>
                                </div>
                                <div
                                    className={cn(
                                        styles.rightPart,
                                        styles.stepPart
                                    )}
                                >
                                    <Typography
                                        variant='h3'
                                        component='h3'
                                        className={styles.stepTitle}
                                    >
                                        {t('receiving')}
                                    </Typography>
                                    <div className={styles.stepsText}>
                                        <Typography
                                            className={styles.stepText}
                                            variant='body1'
                                            component='p'
                                        >
                                            {t(
                                                'carrierComesToTheCountryToReceiver'
                                            )}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className={styles.stepsWrapper}>
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
                                {t('oneChoose')}
                            </Typography>
                            <div className={styles.stepOneText}>
                                <Typography
                                    className={styles.stepOneTextPart}
                                    variant='body1'
                                    component='p'
                                >
                                    {t('oneIfYouReceiver')}
                                </Typography>
                                <Typography
                                    className={cn(
                                        styles.stepOneTextPart,
                                        styles.stepOneTextPartTwo
                                    )}
                                    variant='body1'
                                    component='p'
                                >
                                    {t('oneIfYouCarrier')}
                                </Typography>
                            </div>
                        </div>
                        <div className={styles.stepTwo}>
                            <Typography
                                className={styles.stepTwoTitle}
                                variant='h3'
                                component='h3'
                            >
                                {t('purchase')}
                            </Typography>
                            <div className={styles.stepOneText}>
                                <Typography
                                    className={styles.stepTwoTextPart}
                                    variant='body1'
                                    component='p'
                                >
                                    {t('priceSum')}
                                </Typography>
                                <Typography
                                    className={cn(
                                        styles.stepTwoTextPart,
                                        styles.stepTwoTextPartTwo
                                    )}
                                    variant='body1'
                                    component='p'
                                >
                                    {t('holdMoney')}
                                </Typography>
                            </div>
                        </div>
                        <div className={styles.stepThree}>
                            <Typography
                                className={styles.stepThreeTitle}
                                variant='h3'
                                component='h3'
                            >
                                {t('receiving')}
                            </Typography>
                            <Typography
                                className={styles.stepThreeText}
                                variant='body1'
                                component='p'
                            >
                                {t('carrierComesToTheCountryToReceiver')}
                            </Typography>
                        </div>
                    </div>
                </div> */}
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
        </>
    );
}

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

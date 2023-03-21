import { Button, TextField, Typography } from '@mui/material';
import cn from 'classnames';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { navigateTo } from 'src/interfaces/navigate';
import { selectIsAuthorized } from 'src/redux/selectors/user';
import MainLayout from '../src/Components/Layouts/MainLayout';
import PrivateLayout from '../src/Components/Layouts/Private';
import { privateTypes } from '../src/interfaces/private';
import { EmailSchema } from '../src/schemas/EmailSchema';
import styles from '../styles/WelcomePage.module.css';
import {motion} from 'framer-motion';

type IForm = {
    email: string;
};

export default function Welcome() {
    const router = useRouter();
    const { t } = useTranslation();
    const isAuthorized = useSelector(selectIsAuthorized);

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
                        className={cn(styles.description)}
                    >
                        {t('companyThatUnitesPeople')}
                    </Typography>
                    <Typography
                        variant='h3'
                        component='h2'
                        className={cn(styles.descriptionSecond, {
                            [styles.descriptionWithoutFastSignUp]: isAuthorized,
                        })}
                    >
                        {t('ifYouNeedAnythingWhatYouDontHaveETC')}
                    </Typography>
                    {!isAuthorized && (
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
                            <motion.div initial={{x: -100, opacity: 0}} whileInView={{x: 0,opacity: 1}} 
                            transition={{duration: 1.2}}>
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
                            </motion.div>
                            <motion.div initial={{x: 100, opacity: 0}} whileInView={{x: 0, opacity: 1}}
                            transition={{duration: 1.2}}>
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
                    <Typography
                        variant='h2'
                        component='h2'
                        className={styles.stepsSubTitle}
                    >
                        {t('youCanCreateOwnOrdersOrRespondExistingOnes')}
                    </Typography>
                    <div className={styles.stepsBlock}>
                        <motion.div initial={{opacity: 0, x: -100}} whileInView={{opacity: 1, x: 0}}
                        transition={{delay: 0.5, duration: 1}}>
                            <div className={styles.stepBlock}>
                                <div
                                    className={cn(styles.leftPart, styles.stepPart)}
                                >
                                    <div className={styles.leftPartContent}>
                                        <img
                                            className={styles.firstStepImage}
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
                                    <div className={styles.stepsText}>
                                        <Typography
                                            className={styles.stepTitle}
                                            variant='body1'
                                            component='p'
                                        >
                                            {t('creating')}
                                        </Typography>
                                        <Typography
                                            className={cn(
                                                styles.stepText,
                                                styles.firstStepText
                                            )}
                                            variant='body1'
                                            component='p'
                                        >
                                            {t('oneIfYouReceiver')}
                                        </Typography>
                                        <Typography
                                            className={styles.stepTitle}
                                            variant='body1'
                                            component='p'
                                        >
                                            {t('response')}
                                        </Typography>
                                        <Typography
                                            className={cn(
                                                styles.stepText,
                                                styles.firstStepText
                                            )}
                                            variant='body1'
                                            component='p'
                                        >
                                            {t('oneIfYouCarrier')}
                                        </Typography>
                                    </div>
                                </div>
                            </div>                            
                        </motion.div>
                        <motion.div initial={{opacity: 0, x: 100}} whileInView={{opacity: 1, x: 0}}
                        transition={{delay: 0.5, duration: 1}}>
                            <div
                                className={cn(
                                    styles.stepBlock,
                                    styles.stepBlockReverse,
                                    styles.secondStepBlockMargin
                                )}
                            >
                                <div
                                    className={cn(styles.leftPart, styles.stepPart)}
                                >
                                    <div className={styles.leftPartContent}>
                                        <img
                                            className={styles.secondStepImage}
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
                                        {t('details')}
                                    </Typography>
                                    <div className={styles.stepsText}>
                                        <Typography
                                            className={cn(
                                                styles.stepText,
                                                styles.stepTextRight
                                            )}
                                            variant='body1'
                                            component='p'
                                        >
                                            {t('priceSum')}
                                        </Typography>
                                    </div>
                                </div>
                            </div>                            
                        </motion.div>
                        <motion.div initial={{opacity: 0, x: -100}} whileInView={{opacity: 1, x: 0}}
                        transition={{delay: 0.5, duration: 1}}>  
                            <div
                                className={cn(
                                    styles.stepBlock,
                                    styles.secondStepBlockMargin
                                )}
                            >
                                <div
                                    className={cn(styles.leftPart, styles.stepPart)}
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
                                        {t('paymentDelivery')}
                                    </Typography>
                                    <div className={styles.stepsText}>
                                        <Typography
                                            className={styles.stepText}
                                            variant='body1'
                                            component='p'
                                        >
                                            {t(
                                                'recipientPaysForTheGoodsAndThenTheCarrierDelivers'
                                            )}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </motion.div>      
                        <motion.div initial={{opacity: 0, x: 100}} whileInView={{opacity: 1, x: 0}}
                        transition={{delay: 0.5, duration: 1}}> 
                            <div
                                className={cn(
                                    styles.stepBlock,
                                    styles.stepBlockReverse
                                )}
                            >
                                <div
                                    className={cn(styles.leftPart, styles.stepPart)}
                                >
                                    <div className={styles.leftPartContent}>
                                        <img
                                            className={styles.fourStepImage}
                                            src='/static/images/main-page/result.png'
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
                                        {t('result')}
                                    </Typography>
                                    <div className={styles.stepsText}>
                                        <Typography
                                            className={cn(
                                                styles.stepText,
                                                styles.stepTextRight
                                            )}
                                            variant='body1'
                                            component='p'
                                        >
                                            {t(
                                                'recipientConfirmsReceiptAndTheCarrierGetsReward'
                                            )}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
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

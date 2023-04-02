import { Button, Typography } from '@mui/material';
import cn from 'classnames';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuthorized } from 'src/redux/selectors/user';
import MainLayout from '../src/Components/Layouts/MainLayout';
import PrivateLayout from '../src/Components/Layouts/Private';
import { privateTypes } from '../src/interfaces/private';
import styles from '../styles/WelcomePage.module.css';

export default function Welcome() {
    const { t } = useTranslation();
    const isAuthorized = useSelector(selectIsAuthorized);

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
                        >
                            find a person who can <span>deliver</span> you what
                            you <span>need</span> or a person who needs
                            something from <span>your country</span>
                        </Typography>
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
                    <Typography
                        variant='h2'
                        component='h2'
                        className={styles.stepsSubTitle}
                    >
                        {t('youCanCreateOwnOrdersOrRespondExistingOnes')}
                    </Typography>
                    <div className={styles.steps}>
                        <div className={styles.leftSteps}>
                            <div
                                className={cn(
                                    styles.stepBlock,
                                    styles.firstStep
                                )}
                            >
                                <div className={styles.stepTitle}>
                                    {t('oneChoose')}
                                </div>
                                <div className={styles.firstStepText}>
                                    <div className={styles.stepText}>
                                        {t('oneIfYouReceiver')}
                                    </div>
                                    <div className={styles.stepText}>
                                        {t('oneIfYouCarrier')}
                                    </div>
                                </div>
                            </div>
                            <div
                                className={cn(
                                    styles.stepBlock,
                                    styles.thirdStep
                                )}
                            >
                                <div className={styles.stepTitle}>
                                    {t('details')}
                                </div>
                                <div className={styles.stepText}>
                                    {t('priceSum')}
                                </div>
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
                                <div className={styles.stepTitle}>
                                    {t('paymentDelivery')}
                                </div>
                                <div className={styles.stepText}>
                                    {t(
                                        'recipientPaysForTheGoodsAndThenTheCarrierDelivers'
                                    )}
                                </div>
                            </div>
                            <div
                                className={cn(
                                    styles.stepBlock,
                                    styles.fourStep
                                )}
                            >
                                <div className={styles.stepTitle}>
                                    {t('result')}
                                </div>
                                <div className={styles.stepText}>
                                    {t(
                                        'recipientConfirmsReceiptAndTheCarrierGetsReward'
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <img
                        className={styles.stepsIcon}
                        src='static/images/main-page/white-landing-plane.png'
                    />
                </div>
                <div className={styles.formWrapper}>
                    <div className={styles.formBlcok}>
                        <div>Get started now!</div>
                        <div>
                            <div>first</div>
                            <div>second</div>
                        </div>
                        <div>email</div>
                        <div>date</div>
                        <div>pass</div>
                        <div>confirm</div>
                        <Button>reg</Button>
                    </div>
                </div>
                {/* <div className={styles.advantagesBlock}>
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
                </div> */}
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

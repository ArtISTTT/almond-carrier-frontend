import { Button, Typography } from '@mui/material';
import React from 'react';
import styles from '../../styles/ThanksForRegistration.module.css';
import { useRouter } from 'next/router';
import PrivateLayout from '../../src/Components/Layouts/Private';
import { privateTypes } from '../../src/interfaces/private';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import { navigateTo } from 'src/interfaces/navigate';

const SignIn: React.FC = () => {
    const router = useRouter();
    const { t } = useTranslation();

    const goToDashBoard = () => {
        router.push(navigateTo.DASHBOARD);
    };

    return (
        <PrivateLayout privateType={privateTypes.all}>
            <div className={styles.thanksForRegistrationWrapper}>
                <div className={styles.thanksForRegistrationText}>
                    <Typography
                        variant='h3'
                        component='h2'
                        className={styles.text}
                    >
                        {t('thanksForResistration')}
                    </Typography>
                    <Button
                        className={styles.thanksForRegistrationButton}
                        onClick={goToDashBoard}
                        variant='contained'
                    >
                        {t('makeFirstOrder')}
                    </Button>
                </div>
            </div>
        </PrivateLayout>
    );
};

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

export default SignIn;

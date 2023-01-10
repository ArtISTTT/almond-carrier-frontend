import { Button, Typography } from '@mui/material';
import React from 'react';
import style from '../../styles/ThanksForRegistration.module.css';
import { useRouter } from 'next/router';
import PrivateLayout from '../../src/Components/Layouts/Private';
import { privateTypes } from '../../src/interfaces/private';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const SignIn: React.FC = () => {
    const router = useRouter();

    const goToDashBoard = () => {
        router.push('/dashboard');
    };

    return (
        <PrivateLayout privateType={privateTypes.all}>
            <div className={style.thanksForRegistrationWrapper}>
                <div className={style.thanksForRegistrationText}>
                    <Typography variant='h3' component='h2'>
                        Thanks for registration!
                    </Typography>
                    <Button
                        className={style.thanksForRegistrationButton}
                        onClick={goToDashBoard}
                        variant='contained'
                    >
                        Make your first order
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

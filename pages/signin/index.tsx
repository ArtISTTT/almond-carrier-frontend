import React from 'react';
import LoginLayout from '../../src/Components/Layouts/Login';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import SignInBlock from './SignInBlock';

const SignIn: React.FC = () => {
    return (
        <LoginLayout>
            <SignInBlock />
        </LoginLayout>
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

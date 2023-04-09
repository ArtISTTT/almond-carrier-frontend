import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { SecurityPolicies } from 'src/Components/documents/SecurityPolicies';
import PrivateLayout from 'src/Components/Layouts/Private';
import UserLayout from 'src/Components/Layouts/User';
import { privateTypes } from 'src/interfaces/private';
import LoginLayout from '../../src/Components/Layouts/Login';

const SignIn: React.FC = () => {
    return (
        <PrivateLayout privateType={privateTypes.all}>
            <UserLayout>
                <SecurityPolicies />
            </UserLayout>
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

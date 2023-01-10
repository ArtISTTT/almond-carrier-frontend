import React from 'react';
import Dashboard from '../../src/Components/Dashboard/Dashboard';
import PrivateLayout from '../../src/Components/Layouts/Private';
import { privateTypes } from '../../src/interfaces/private';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ReceiverPage: React.FC = () => (
    <PrivateLayout privateType={privateTypes.onlyAuthorized}>
        <Dashboard />
    </PrivateLayout>
);

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

export default ReceiverPage;

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import Disclaimer from 'src/Components/documents/Disclaimer';
import UserLayout from 'src/Components/Layouts/User';
import PrivateLayout from '../../src/Components/Layouts/Private';
import { privateTypes } from '../../src/interfaces/private';

const DisclaimerComponent: React.FC = () => (
    <PrivateLayout privateType={privateTypes.all}>
        <UserLayout>
            <Disclaimer />
        </UserLayout>
    </PrivateLayout>
);

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

export default DisclaimerComponent;

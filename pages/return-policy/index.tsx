import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import UserLayout from 'src/Components/Layouts/User';
import PrivateLayout from '../../src/Components/Layouts/Private';
import { privateTypes } from '../../src/interfaces/private';
import ReturnPolicy from 'src/Components/documents/ReturnPolicy';

const DisclaimerComponent: React.FC = () => (
    <PrivateLayout privateType={privateTypes.all}>
        <UserLayout>
            <ReturnPolicy />
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

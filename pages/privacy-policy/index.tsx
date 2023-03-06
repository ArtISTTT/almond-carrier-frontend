import React from 'react';
import PrivateLayout from '../../src/Components/Layouts/Private';
import { privateTypes } from '../../src/interfaces/private';
import UserLayout from '../../src/Components/Layouts/User';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PolicyPrivacy from 'src/Components/documents/PolicyPrivacy';

const ReceiverPage: React.FC = () => (
    <PrivateLayout privateType={privateTypes.all}>
        <UserLayout>
            <PolicyPrivacy />
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

export default ReceiverPage;

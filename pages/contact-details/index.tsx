import React from 'react';
import PrivateLayout from '../../src/Components/Layouts/Private';
import { privateTypes } from '../../src/interfaces/private';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import UserLayout from 'src/Components/Layouts/User';
import ContactDetails from 'src/Components/documents/ContactDetails';

const ReceiverPage: React.FC = () => (
    <PrivateLayout privateType={privateTypes.all}>
        <UserLayout>
            <ContactDetails />
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

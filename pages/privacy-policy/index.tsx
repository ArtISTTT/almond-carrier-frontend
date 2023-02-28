import React from 'react';
import PrivateLayout from '../../src/Components/Layouts/Private';
import { privateTypes } from '../../src/interfaces/private';
import CarrierLayout from '../../src/Components/Layouts/Carrier';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PolicyPrivacy from 'src/Components/documents/PolicyPrivacy';

const ReceiverPage: React.FC = () => (
    <PrivateLayout privateType={privateTypes.all}>
        <CarrierLayout>
            <PolicyPrivacy />
        </CarrierLayout>
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

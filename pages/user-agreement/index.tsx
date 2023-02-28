import React from 'react';
import PrivateLayout from '../../src/Components/Layouts/Private';
import { privateTypes } from '../../src/interfaces/private';
import CarrierLayout from '../../src/Components/Layouts/Carrier';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import UserAgreement from 'src/Components/documents/userAgreement';

const ReceiverPage: React.FC = () => (
    <PrivateLayout privateType={privateTypes.all}>
        <CarrierLayout>
            <UserAgreement />
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

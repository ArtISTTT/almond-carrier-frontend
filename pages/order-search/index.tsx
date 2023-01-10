import React from 'react';
import PrivateLayout from '../../src/Components/Layouts/Private';
import { privateTypes } from '../../src/interfaces/private';
import OrderSearch from '../../src/Components/OrderSearch/OrderSearch';
import CarrierLayout from '../../src/Components/Layouts/Carrier';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ReceiverPage: React.FC = () => (
    <PrivateLayout privateType={privateTypes.onlyAuthorized}>
        <CarrierLayout>
            <OrderSearch />
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

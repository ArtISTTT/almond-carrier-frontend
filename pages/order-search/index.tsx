import React from 'react';
import PrivateLayout from '../../src/Components/Layouts/Private';
import { privateTypes } from '../../src/interfaces/private';
import OrderSearch from '../../src/Components/OrderSearch/OrderSearch';
import CarrierLayout from '../../src/Components/Layouts/Carrier';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

const ReceiverPage: React.FC = () => (
    <>
        <Head>
            <title>Friendly carrier - Orders search</title>
            <meta
                name='description'
                content='Search for delivery or ordering some goods'
            />
            <meta
                property='og:title'
                content='Friendly carrier - P2P delivery platform'
            />
            <meta
                property='og:description'
                content='Search for delivery or ordering some goods'
            />
            <meta
                property='v:url'
                content='https://friendlycarrier.com/order-search'
            />
            <meta
                property='og:image'
                content='/static/images/main-page/background2.png'
            />
            <meta property='og:type' content='website' />
        </Head>
        <PrivateLayout privateType={privateTypes.all}>
            <CarrierLayout>
                <OrderSearch />
            </CarrierLayout>
        </PrivateLayout>
    </>
);

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

export default ReceiverPage;

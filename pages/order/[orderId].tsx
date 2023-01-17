import { useRouter } from 'next/router';
import React from 'react';
import PrivateLayout from '../../src/Components/Layouts/Private';
import { privateTypes } from '../../src/interfaces/private';
import MainLayout from '../../src/Components/Layouts/MainLayout';
import OrderPage from '../../src/Components/OrderPage/OrderPage';
import Head from 'next/head';
import Script from 'next/script';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPaths } from 'next';

const Order = () => {
    return (
        <>
            <Script src='//code.jivosite.com/widget/HKJbIvZfS8' async />
            <PrivateLayout privateType={privateTypes.onlyAuthorized}>
                <MainLayout
                    showContinueIfAuthorized={false}
                    showSignInOutIfUnauthorized={false}
                >
                    <OrderPage />
                </MainLayout>
            </PrivateLayout>
        </>
    );
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    };
};

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

export default Order;

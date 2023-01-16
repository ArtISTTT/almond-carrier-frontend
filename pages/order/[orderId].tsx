import { useRouter } from 'next/router';
import React from 'react';
import PrivateLayout from '../../src/Components/Layouts/Private';
import { privateTypes } from '../../src/interfaces/private';
import MainLayout from '../../src/Components/Layouts/MainLayout';
import OrderPage from '../../src/Components/OrderPage/OrderPage';
import Head from 'next/head';
import Script from 'next/script';

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

export default Order;

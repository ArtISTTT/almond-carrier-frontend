import { useRouter } from 'next/router';
import React from 'react';
import PrivateLayout from '../../src/Components/Layouts/Private';
import { privateTypes } from '../../src/interfaces/private';
import MainLayout from '../../src/Components/Layouts/MainLayout';

const OrderPage = () => {
    const router = useRouter();

    return (
        <PrivateLayout privateType={privateTypes.onlyAuthorized}>
            <MainLayout
                showContinueIfAuthorized={false}
                showSignInOutIfUnauthorized={false}
            >
                <h1>{router.query.orderId}</h1>
            </MainLayout>
        </PrivateLayout>
    );
};

export default OrderPage;

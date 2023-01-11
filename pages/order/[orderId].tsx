import { useRouter } from 'next/router';
import React from 'react';
import PrivateLayout from '../../src/Components/Layouts/Private';
import { privateTypes } from '../../src/interfaces/private';
import MainLayout from '../../src/Components/Layouts/MainLayout';
import OrderPage from '../../src/Components/OrderPage/OrderPage';

const Order = () => {
    return (
        <PrivateLayout privateType={privateTypes.onlyAuthorized}>
            <MainLayout
                showContinueIfAuthorized={false}
                showSignInOutIfUnauthorized={false}
            >
                <OrderPage />
            </MainLayout>
        </PrivateLayout>
    );
};

export default Order;

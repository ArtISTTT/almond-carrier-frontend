import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import Payouts from 'src/Components/Payouts/Payouts';
import PrivateLayout from '../../src/Components/Layouts/Private';
import UserLayout from '../../src/Components/Layouts/User';
import { privateTypes } from '../../src/interfaces/private';

const PayoutsPage: React.FC = () => (
    <PrivateLayout privateType={privateTypes.onlyAuthorized}>
        <UserLayout>
            <Payouts />
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

export default PayoutsPage;

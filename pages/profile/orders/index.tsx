import React from 'react';
import UserLayout from '../../../src/Components/Layouts/User';
import ProfileLayout from '../../../src/Components/Layouts/ProfileLayout';
import ProfileOrders from '../../../src/Components/MyProfile/ProfileOrders';
import PrivateLayout from '../../../src/Components/Layouts/Private';
import { privateTypes } from '../../../src/interfaces/private';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const index = () => {
    return (
        <PrivateLayout privateType={privateTypes.onlyAuthorized}>
            <UserLayout>
                <ProfileLayout>
                    <ProfileOrders />
                </ProfileLayout>
            </UserLayout>
        </PrivateLayout>
    );
};

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

export default index;

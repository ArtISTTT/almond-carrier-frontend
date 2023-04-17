import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import PrivateLayout from 'src/Components/Layouts/Private';
import ProfileLayout from 'src/Components/Layouts/ProfileLayout';
import UserLayout from 'src/Components/Layouts/User';
import { Verification } from 'src/Components/MyProfile/Verification';
import { privateTypes } from 'src/interfaces/private';

const index = () => {
    return (
        <PrivateLayout privateType={privateTypes.onlyAuthorized}>
            <UserLayout>
                <ProfileLayout>
                    <Verification />
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

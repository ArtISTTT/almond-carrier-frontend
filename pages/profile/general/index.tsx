import React from 'react';
import UserLayout from 'src/Components/Layouts/User';
import ProfileLayout from 'src/Components/Layouts/ProfileLayout';
import PrivateLayout from 'src/Components/Layouts/Private';
import General from 'src/Components/MyProfile/General';
import { privateTypes } from 'src/interfaces/private';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const index = () => {
    return (
        <PrivateLayout privateType={privateTypes.onlyAuthorized}>
            <UserLayout>
                <ProfileLayout>
                    <General />
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

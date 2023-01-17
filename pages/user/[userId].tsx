import React from 'react';
import MainLayout from '../../src/Components/Layouts/MainLayout';
import PrivateLayout from '../../src/Components/Layouts/Private';
import ProfileInfo from '../../src/Components/UserProfile/ProfileInfo';
import ProfileContent from '../../src/Components/UserProfile/ProfileContent';
import { privateTypes } from '../../src/interfaces/private';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPaths } from 'next';

const User: React.FC = () => {
    return (
        <PrivateLayout privateType={privateTypes.all}>
            <MainLayout
                showContinueIfAuthorized={true}
                showSignInOutIfUnauthorized={true}
            >
                <ProfileInfo />
                <ProfileContent />
            </MainLayout>
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

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    };
};

export default User;

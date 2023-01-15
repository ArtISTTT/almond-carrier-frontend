import React from 'react';
import CarrierLayout from '../../../src/Components/Layouts/Carrier';
import ProfileLayout from '../../../src/Components/Layouts/ProfileLayout';
import PrivateLayout from '../../../src/Components/Layouts/Private';
import { privateTypes } from '../../../src/interfaces/private';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { General } from '../../../src/Components/Profile/General';

const index = () => {
    return (
        <PrivateLayout privateType={privateTypes.onlyAuthorized}>
            <CarrierLayout>
                <ProfileLayout>
                    <General />
                </ProfileLayout>
            </CarrierLayout>
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

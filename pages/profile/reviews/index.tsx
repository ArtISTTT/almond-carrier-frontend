import React from 'react';
import CarrierLayout from '../../../src/Components/Layouts/Carrier';
import ProfileLayout from '../../../src/Components/Layouts/ProfileLayout';
import ProfileReviews from '../../../src/Components/profile/ProfileReviews';
import PrivateLayout from '../../../src/Components/Layouts/Private';
import { privateTypes } from '../../../src/interfaces/private';

const index = () => {
    return (
        <PrivateLayout privateType={privateTypes.onlyAuthorized}>
            <CarrierLayout>
                <ProfileLayout>
                    <ProfileReviews />
                </ProfileLayout>
            </CarrierLayout>
        </PrivateLayout>
    );
};

export default index;

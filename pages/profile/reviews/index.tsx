import React from 'react';
import CarrierLayout from '../../../src/Components/Layouts/Carrier';
import ProfileLayout from '../../../src/Components/Layouts/ProfileLayout';
import ProfileReviews from '../../../src/Components/profile/ProfileReviews';

const index = () => {
    return (
        <CarrierLayout>
            <ProfileLayout>
                <ProfileReviews />
            </ProfileLayout>
        </CarrierLayout>
    );
};

export default index;

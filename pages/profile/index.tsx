import React from 'react';
import CarrierLayout from '../../src/Components/Layouts/Carrier';
import ProfileLayout from '../../src/Components/Layouts/ProfileLayout';
import ProfileOrders from '../../src/Components/profile/ProfileOrders';

const index = () => {
    return (
        <CarrierLayout>
            <ProfileLayout>
                <ProfileOrders />
            </ProfileLayout>
        </CarrierLayout>
    );
};

export default index;

import React from 'react';
import CarrierLayout from '../../../src/Components/Layouts/Carrier';
import ProfileLayout from '../../../src/Components/Layouts/ProfileLayout';
import ProfileOrders from '../../../src/Components/profile/ProfileOrders';
import General from '../../../src/Components/profile/General';

const index = () => {
    return (
        <CarrierLayout>
            <ProfileLayout>
                <General></General>
            </ProfileLayout>
        </CarrierLayout>
    );
};

export default index;

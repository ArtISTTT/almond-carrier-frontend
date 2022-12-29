import React from 'react';
import CarrierLayout from '../../../src/Components/Layouts/Carrier';
import ProfileLayout from '../../../src/Components/Layouts/ProfileLayout';
import General from '../../../src/Components/profile/General';
import PrivateLayout from '../../../src/Components/Layouts/Private';
import { privateTypes } from '../../../src/interfaces/private';

const index = () => {
    return (
        <PrivateLayout privateType={privateTypes.onlyAuthorized}>
            <CarrierLayout>
                <ProfileLayout>
                    <General></General>
                </ProfileLayout>
            </CarrierLayout>
        </PrivateLayout>
    );
};

export default index;

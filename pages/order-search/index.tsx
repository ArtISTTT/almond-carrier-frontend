import React from 'react';
import PrivateLayout from '../../src/Components/Layouts/Private';
import { privateTypes } from '../../src/interfaces/private';
import OrderSearch from '../../src/Components/OrderSearch/OrderSearch';
import CarrierLayout from '../../src/Components/Layouts/Carrier';

const ReceiverPage: React.FC = () => (
    <PrivateLayout privateType={privateTypes.onlyAuthorized}>
        <CarrierLayout>
            <OrderSearch />
        </CarrierLayout>
    </PrivateLayout>
);

export default ReceiverPage;

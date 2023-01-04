import React from 'react';
import Dashboard from '../../src/Components/Dashboard/Dashboard';
import PrivateLayout from '../../src/Components/Layouts/Private';
import { privateTypes } from '../../src/interfaces/private';

const ReceiverPage: React.FC = () => (
    <PrivateLayout privateType={privateTypes.onlyAuthorized}>
        <Dashboard />
    </PrivateLayout>
);

export default ReceiverPage;

import React from 'react';
import MainLayout from '../../src/Components/Layouts/MainLayout';
import PrivateLayout from '../../src/Components/Layouts/Private';
import ProfileInfo from '../../src/Components/UserProfile/ProfileInfo';
import { privateTypes } from '../../src/interfaces/private';

const User: React.FC = () => {
    return (
        <PrivateLayout privateType={privateTypes.all}>
            <MainLayout
                showContinueIfAuthorized={false}
                showSignInOutIfUnauthorized={true}
            >
                <ProfileInfo />
            </MainLayout>
        </PrivateLayout>
    );
};

export default User;

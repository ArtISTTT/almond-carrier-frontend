import React from 'react';
import MainLayout from '../../src/Components/Layouts/MainLayout';
import PrivateLayout from '../../src/Components/Layouts/Private';
import ProfileInfo from '../../src/Components/UserProfile/ProfileInfo';
import ProfileConent from '../../src/Components/UserProfile/ProfileConent';
import { privateTypes } from '../../src/interfaces/private';

const User: React.FC = () => {
    return (
        <PrivateLayout privateType={privateTypes.all}>
            <MainLayout
                showContinueIfAuthorized={false}
                showSignInOutIfUnauthorized={true}
            >
                <ProfileInfo />
                <ProfileConent />
            </MainLayout>
        </PrivateLayout>
    );
};

export default User;

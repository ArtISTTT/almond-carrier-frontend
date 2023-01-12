import React from 'react';
import MainLayout from '../../src/Components/Layouts/MainLayout';
import ProfileInfo from '../../src/Components/profileForNewUser/ProfileInfo';

const ProfileForNewUser = () => {
    return (
        <MainLayout
            showContinueIfAuthorized={false}
            showSignInOutIfUnauthorized={true}
        >
            <ProfileInfo />
        </MainLayout>
    );
};

export default ProfileForNewUser;

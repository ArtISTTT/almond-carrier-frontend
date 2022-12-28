import React from 'react';
import ProfileCard from '../profile/ProfileCard';
import ProfileNavbar from '../profile/ProfileNavbar';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <div>
                <ProfileCard />
            </div>
            <ProfileNavbar />
            {children}
        </div>
    );
};

export default ProfileLayout;

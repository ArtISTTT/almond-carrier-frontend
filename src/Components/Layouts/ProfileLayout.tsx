import React from 'react';
import ProfileCard from '../MyProfile/ProfileCard';
import ProfileNavbar from '../MyProfile/ProfileNavbar';
import styles from '../../../styles/Profile.module.css';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={styles.profileLayoutWrapper}>
            <div className={styles.menuWrapper}>
                <ProfileCard />
                <ProfileNavbar />
            </div>
            <div className={styles.profileLayoutContentWrapper}>
                <div className={styles.profileLayoutContentInner}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ProfileLayout;

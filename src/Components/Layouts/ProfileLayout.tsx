import React from 'react';
import ProfileCard from '../MyProfile/ProfileCard';
import ProfileNavbar from '../MyProfile/ProfileNavbar';
import styles from '../../../styles/Profile.module.css';

interface IProps {
    children: React.ReactNode;
}

const ProfileLayout: React.FC<IProps> = ({ children }) => {
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

import React from 'react';
import styles from '../../../styles/Profile.module.css';
import ProfileCard from '../MyProfile/ProfileCard';
import ProfileNavbar from '../MyProfile/ProfileNavbar';

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

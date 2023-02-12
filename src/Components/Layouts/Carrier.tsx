import React from 'react';
import styles from '../../../styles/mainLayout.module.css';
import MainLayout from './MainLayout';

const CarrierLayout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <MainLayout
            showContinueIfAuthorized={false}
            showSignInOutIfUnauthorized={true}
        >
            <div className={styles.carrierLayoutContent}>{children}</div>
        </MainLayout>
    );
};

export default CarrierLayout;

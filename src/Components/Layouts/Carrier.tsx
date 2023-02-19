import React from 'react';
import styles from '../../../styles/mainLayout.module.css';
import MainLayout from './MainLayout';

interface IProps {
    children: React.ReactNode;
}

const CarrierLayout: React.FC<IProps> = ({ children }) => {
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

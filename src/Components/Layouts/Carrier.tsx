import React from 'react';
import { useRouter } from 'next/router';
import styles from '../../../styles/mainLayout.module.css';
import MainLayout from './MainLayout';

const CarrierLayout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    return (
        <MainLayout
            showContinueIfAuthorized={false}
            showSignInOutIfUnauthorized={false}
        >
            <div className={styles.carrierLayoutContent}>{children}</div>
        </MainLayout>
    );
};

export default CarrierLayout;

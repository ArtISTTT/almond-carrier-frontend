import React from 'react';
import { useRouter } from 'next/router';
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
            <div>{children}</div>
        </MainLayout>
    );
};

export default CarrierLayout;

import { Avatar } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { getCurrentUser } from '../../api/auth';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        getCurrentUser().then(data => {
            if (data.ok) {
                router.push('/carrier');
            } else {
                router.push('/');
            }
        });
    }, []);

    return <>{children}</>;
};

export default AuthLayout;

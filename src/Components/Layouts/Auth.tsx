import { Avatar } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { getCurrentUser } from '../../api/auth';
import { useAppDispatch } from '../../redux/hooks';
import { addUserData } from '../../redux/slices/userSlice';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();
    const dispath = useAppDispatch();

    useEffect(() => {
        getCurrentUser().then(data => {
            if (data.ok && data.user) {
                dispath(addUserData(data.user));
                router.push('/carrier');
            } else {
                router.push('/');
            }
        });
    }, []);

    return <>{children}</>;
};

export default AuthLayout;

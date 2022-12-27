import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { getCurrentUser } from '../../api/auth';
import { useAppDispatch } from '../../redux/hooks';
import {
    addUserData,
    setInitializeAuthChecked,
    setIsAuthorized,
} from '../../redux/slices/userSlice';
import { useSelector } from 'react-redux';
import { selectIsInitializeAuthChecked } from '../../redux/selectors/user';

type IAuthLayout = {
    children: React.ReactNode;
};

const AuthLayout: React.FC<IAuthLayout> = ({ children }) => {
    const router = useRouter();
    const dispath = useAppDispatch();
    const authChecked = useSelector(selectIsInitializeAuthChecked);

    useEffect(() => {
        getCurrentUser().then(data => {
            if (data.ok && data.user) {
                dispath(addUserData(data.user));
                dispath(setIsAuthorized(true));
            }

            dispath(setInitializeAuthChecked(true));
        });
    }, []);

    if (!authChecked) {
        return <>Loading...</>;
    }

    return <>{children}</>;
};

export default AuthLayout;

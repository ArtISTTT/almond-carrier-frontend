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
import {
    selectIsInitializeAuthChecked,
    selectUser,
} from '../../redux/selectors/user';
import Loader from '../Loader';
import dayjs from 'dayjs';
import { IGetCurrentUserReturn } from '../../interfaces/api/auth';

type IAuthLayout = {
    children: React.ReactNode;
};

const AuthLayout: React.FC<IAuthLayout> = ({ children }) => {
    const authChecked = useSelector(selectIsInitializeAuthChecked);
    const dispatch = useAppDispatch();

    const updateUser = (data: IGetCurrentUserReturn) => {
        if (data.ok && data.user) {
            dispatch(
                addUserData({
                    ...data.user,
                    dateOfBirth: dayjs(data.user.dateOfBirth),
                    phoneNumber: data.user.phoneNumber ?? '',
                    gender: data.user.gender ?? '',
                })
            );
            dispatch(setIsAuthorized(true));
        }

        dispatch(setInitializeAuthChecked(true));
    };

    useEffect(() => {
        getCurrentUser().then(data => {
            updateUser(data);
        });
    }, []);

    if (!authChecked) {
        return <Loader />;
    }

    return <>{children}</>;
};

export default AuthLayout;

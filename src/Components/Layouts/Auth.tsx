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
import Loader from '../Loader';
import { IGetCurrentUserReturn } from '../../interfaces/api/auth';
import { parseUserDataFromApi } from '../../helpers/parseUserDataFromApi';
import { changeLanguage } from '../../redux/slices/settingsSlice';

type IAuthLayout = {
    children: React.ReactNode;
};

const AuthLayout: React.FC<IAuthLayout> = ({ children }) => {
    const authChecked = useSelector(selectIsInitializeAuthChecked);
    const dispatch = useAppDispatch();

    const updateUser = (data: IGetCurrentUserReturn) => {
        if (data.ok && data.user) {
            dispatch(addUserData(parseUserDataFromApi(data.user)));
            dispatch(setIsAuthorized(true));
        }

        const trimmedLanguage = navigator.language
            .trim()
            .split(/-|_/)[0]
            .toLowerCase();
        dispatch(
            changeLanguage(trimmedLanguage === 'ru' ? trimmedLanguage : 'en')
        );

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

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
import { Language } from '../../interfaces/settings';
import dayjs from 'dayjs';

type IAuthLayout = {
    children: React.ReactNode;
};

const AuthLayout: React.FC<IAuthLayout> = ({ children }) => {
    const authChecked = useSelector(selectIsInitializeAuthChecked);
    const dispatch = useAppDispatch();
    const { locale } = useRouter();
    const { push, route } = useRouter();

    const updateUser = (data: IGetCurrentUserReturn) => {
        if (data.ok && data.user) {
            dispatch(addUserData(parseUserDataFromApi(data.user)));
            dispatch(setIsAuthorized(true));
        }

        const savedLocale = localStorage.getItem('language');

        if (savedLocale) {
            dispatch(changeLanguage({ language: savedLocale as Language }));
            dayjs.locale(savedLocale);

            if (savedLocale !== locale) {
                push(route, undefined, { locale: savedLocale });
            }
        } else {
            dispatch(
                changeLanguage({
                    language: (locale as Language) ?? Language.EN,
                })
            );
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

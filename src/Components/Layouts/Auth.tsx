import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toggleTheme } from 'src/helpers/changeTheme';
import { getCurrentUser } from '../../api/auth';
import { parseUserDataFromApi } from '../../helpers/parseUserDataFromApi';
import { IGetCurrentUserReturn } from '../../interfaces/api/auth';
import { Language, Theme } from '../../interfaces/settings';
import { useAppDispatch } from '../../redux/hooks';
import { selectIsInitializeAuthChecked } from '../../redux/selectors/user';
import {
    changeLanguage,
    changeTheme,
    DEFAULT_THEME,
} from '../../redux/slices/settingsSlice';
import {
    addUserData,
    setInitializeAuthChecked,
    setIsAuthorized,
} from '../../redux/slices/userSlice';
import Loader from '../Loaders/Loader';

type IAuthLayout = {
    children: React.ReactNode;
};

const AuthLayout: React.FC<IAuthLayout> = ({ children }) => {
    const authChecked = useSelector(selectIsInitializeAuthChecked);
    const dispatch = useAppDispatch();
    const { locale } = useRouter();
    const { push, asPath } = useRouter();

    const updateUser = (data: IGetCurrentUserReturn) => {
        if (data.ok && data.user) {
            dispatch(addUserData(parseUserDataFromApi(data.user)));
            dispatch(setIsAuthorized(true));
        }

        dispatch(setInitializeAuthChecked(true));
    };

    useEffect(() => {
        const savedLocale = localStorage.getItem('language');

        if (savedLocale) {
            dispatch(changeLanguage({ language: savedLocale as Language }));
            dayjs.locale(savedLocale);

            if (savedLocale !== locale) {
                push(asPath, undefined, { locale: savedLocale });
            }
        } else {
            localStorage.setItem('language', locale ?? Language.EN);
            dispatch(
                changeLanguage({
                    language: (locale as Language) ?? Language.EN,
                })
            );
        }

        const savedTheme = localStorage.getItem('theme') as Theme | undefined;

        if (savedTheme) {
            changeTheme({ theme: savedTheme });
        }

        toggleTheme(savedTheme ?? DEFAULT_THEME);

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

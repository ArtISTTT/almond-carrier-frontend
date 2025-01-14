import { useRouter } from 'next/router';
import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { privateTypes } from '../../interfaces/private';
import { selectIsAuthorized } from '../../redux/selectors/user';
import { navigateTo } from 'src/interfaces/navigate';

type IAuthLayout = {
    privateType: privateTypes;
    children: React.ReactNode;
};

const PrivateLayout: React.FC<IAuthLayout> = ({ privateType, children }) => {
    const router = useRouter();
    const isAuthorized = useAppSelector(selectIsAuthorized);

    if (privateType === privateTypes.onlyAuthorized && !isAuthorized) {
        router.push(navigateTo.LANDING);
        return <></>;
    }

    if (privateType === privateTypes.onlyUnauthorized && isAuthorized) {
        router.push(navigateTo.DASHBOARD);
        return <></>;
    }

    return <>{children}</>;
};

export default PrivateLayout;

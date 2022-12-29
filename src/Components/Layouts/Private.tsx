import { useRouter } from 'next/router';
import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { privateTypes } from '../../interfaces/private';
import { selectIsAuthorized, selectUser } from '../../redux/selectors/user';

type IAuthLayout = {
    privateType: privateTypes;
    children: React.ReactNode;
};

const PrivateLayout: React.FC<IAuthLayout> = ({ privateType, children }) => {
    const router = useRouter();
    const isAuthorized = useAppSelector(selectIsAuthorized);

    if (privateType === privateTypes.onlyAuthorized) {
        router.push('/signin');
        return <></>;
    }

    if (privateType === privateTypes.onlyUnauthorized && isAuthorized) {
        router.push('/carrier');
        return <></>;
    }

    return <>{children}</>;
};

export default PrivateLayout;

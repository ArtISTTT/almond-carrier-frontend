import { useRouter } from 'next/router';
import React, { useEffect, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { verifyEmail } from 'src/api/auth';
import { OpenAlertContext } from 'src/Components/Layouts/Snackbar';
import { parseUserDataFromApi } from 'src/helpers/parseUserDataFromApi';
import { IVerifyEmail } from 'src/interfaces/api/auth';
import { LoaderColors } from 'src/interfaces/loader';
import { navigateTo } from 'src/interfaces/navigate';
import { useAppDispatch } from 'src/redux/hooks';
import { addUserData, setIsAuthorized } from 'src/redux/slices/userSlice';
import styles from '../../../styles/SignIn.module.css';
import CircleLoader from '../Loaders/CircleLoader';
import Loader from '../Loaders/Loader';

const Verification = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const { triggerOpen } = useContext(OpenAlertContext);
    const dispatch = useAppDispatch();
    const [userData, setUserData] = useState<IVerifyEmail>({
        token: '',
        userId: '',
    });
    const [isDataSent, setIsDataSent] = useState<boolean>(false);
    const { token, id } = router.query;

    useEffect(() => {
        if (!router.isReady) return;

        setUserData({ token: token as string, userId: id as string });
    }, [router.isReady]);

    useEffect(() => {
        if (userData.token && userData.userId && !isDataSent) {
            handleVerifyEmail();
        }
    }, [isDataSent, userData]);

    const handleVerifyEmail = async () => {
        setIsDataSent(true);
        const data = await verifyEmail(userData);

        if (data.ok && data.user) {
            dispatch(addUserData(parseUserDataFromApi(data.user)));
            dispatch(setIsAuthorized(true));
            triggerOpen({
                severity: 'success',
                text: t('emailVerified'),
            });
            router.push(navigateTo.THANKS_FOR_REGISTRATION);
        } else {
            triggerOpen({
                severity: 'error',
                text: data.error || t('emailVerifiedError'),
            });
        }
    };

    if (router.isReady && (!token || !id)) {
        return <Loader />;
    }
    return (
        <div className={styles.verificationWrapper}>
            <CircleLoader color={LoaderColors.PRIMARY} />
            <div className={styles.checkText}>{t('checkingYourMail')}</div>
        </div>
    );
};

export default Verification;

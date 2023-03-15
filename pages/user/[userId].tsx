import { GetStaticPaths } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getUser } from 'src/api/user';
import { OpenAlertContext } from 'src/Components/Layouts/Snackbar';
import UserLayout from 'src/Components/Layouts/User';
import CircleLoader from 'src/Components/Loaders/CircleLoader';
import CarrierApplyPopup from 'src/Components/OrderSearch/CarrierApplyPopup';
import ReceiverApplyPopup from 'src/Components/OrderSearch/ReceiverApplyPopup';
import { parseOrderDataFromApi } from 'src/helpers/parseOrderDataFromApi';
import { IGetUser } from 'src/interfaces/api/user';
import { LoaderColors } from 'src/interfaces/loader';
import { navigateTo } from 'src/interfaces/navigate';
import { IOrder } from 'src/interfaces/order';
import { OrderSeachType } from 'src/interfaces/order-search';
import { useAppSelector } from 'src/redux/hooks';
import MainLayout from '../../src/Components/Layouts/MainLayout';
import PrivateLayout from '../../src/Components/Layouts/Private';
import ProfileContent from '../../src/Components/UserProfile/ProfileContent';
import ProfileInfo from '../../src/Components/UserProfile/ProfileInfo';
import { privateTypes } from '../../src/interfaces/private';
import styles from '../../styles/ProfileForNewUser.module.css';

const useGetCurrentUser = ({ userId }: { userId: string }) => {
    const { t } = useTranslation();
    const language = useAppSelector(
        state => state.settings.generalSettings.language
    );
    const { triggerOpen } = useContext(OpenAlertContext);
    const [user, setUser] = useState<IGetUser | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getCurrentUser = async () => {
        setIsLoading(true);
        const data = await getUser({ userId });

        if (data.ok && data.user) {
            setUser({
                ...data.user,
                successOrders: await parseOrderDataFromApi(
                    data.user.successOrders,
                    language
                ),
            });
            setIsLoading(false);
        } else {
            triggerOpen({
                severity: 'error',
                text: data.error || t('errorLoadingUserPage'),
            });
            setUser(undefined);
            setIsLoading(false);
        }
    };

    return { user, getCurrentUser, isLoading };
};

const User: React.FC = () => {
    const { query, push } = useRouter();
    const [applyedOrder, setApplyedOrder] = useState<IOrder>();
    const { user, getCurrentUser, isLoading } = useGetCurrentUser({
        userId: query.userId as string,
    });
    const currentUserId = useAppSelector(({ user }) => user.data?.id);
    const closePopup = () => setApplyedOrder(undefined);

    React.useEffect(() => {
        getCurrentUser();
    }, [query.userId]);

    if (!user || isLoading) {
        return (
            <div className={styles.loaderWrapper}>
                <CircleLoader color={LoaderColors.PRIMARY} />
            </div>
        );
    }

    if (user.id === currentUserId) {
        push(navigateTo.PROFILE_ORDERS);
    }

    if (applyedOrder) {
        return (
            <PrivateLayout privateType={privateTypes.all}>
                <MainLayout
                    showContinueIfAuthorized={true}
                    showSignInOutIfUnauthorized={true}
                >
                    {!applyedOrder.receiver && applyedOrder.carrier ? (
                        <CarrierApplyPopup
                            order={applyedOrder}
                            closePopup={closePopup}
                        />
                    ) : (
                        <ReceiverApplyPopup
                            order={applyedOrder}
                            closePopup={closePopup}
                        />
                    )}
                </MainLayout>
            </PrivateLayout>
        );
    }

    return (
        <PrivateLayout privateType={privateTypes.all}>
            <MainLayout
                showContinueIfAuthorized={true}
                showSignInOutIfUnauthorized={true}
            >
                <ProfileInfo user={user} />
                <ProfileContent setApplyedOrder={setApplyedOrder} user={user} />
            </MainLayout>
        </PrivateLayout>
    );
};

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    };
};

export default User;

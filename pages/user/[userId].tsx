import React, { useContext } from 'react';
import MainLayout from '../../src/Components/Layouts/MainLayout';
import PrivateLayout from '../../src/Components/Layouts/Private';
import ProfileInfo from '../../src/Components/UserProfile/ProfileInfo';
import ProfileContent from '../../src/Components/UserProfile/ProfileContent';
import { privateTypes } from '../../src/interfaces/private';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPaths } from 'next';
import { getUser } from 'src/api/user';
import { useRouter } from 'next/router';
import { OpenAlertContext } from 'src/Components/Layouts/Snackbar';
import { useTranslation } from 'react-i18next';
import { IGetUser } from 'src/interfaces/api/user';
import { useAppSelector } from 'src/redux/hooks';
import { navigateTo } from 'src/interfaces/navigate';
import { parseOrderDataFromApi } from 'src/helpers/parseOrderDataFromApi';
import CircleLoader from 'src/Components/Loaders/CircleLoader';
import styles from '../../styles/ProfileForNewUser.module.css';
import { LoaderColors } from 'src/interfaces/loader';

const useGetCurrentUser = ({ userId }: { userId: string }) => {
    const { t } = useTranslation();
    const language = useAppSelector(
        state => state.settings.generalSettings.language
    );
    const { triggerOpen } = useContext(OpenAlertContext);

    const [user, setUser] = React.useState<IGetUser | undefined>(undefined);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

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

    const { user, getCurrentUser, isLoading } = useGetCurrentUser({
        userId: query.userId as string,
    });

    const currentUserId = useAppSelector(({ user }) => user.data?.id);

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

    return (
        <PrivateLayout privateType={privateTypes.all}>
            <MainLayout
                showContinueIfAuthorized={true}
                showSignInOutIfUnauthorized={true}
            >
                <ProfileInfo user={user} />
                <ProfileContent user={user} />
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

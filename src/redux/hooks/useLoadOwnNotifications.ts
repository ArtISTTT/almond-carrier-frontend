import React, { useContext } from 'react';
import { OpenAlertContext } from '../../Components/Layouts/Snackbar';
import { useTranslation } from 'react-i18next';
import { getMyNotifications } from 'src/api/notifications';
import { IUserNotification } from 'src/interfaces/notifications';
import { parseNotificationsFromApi } from 'src/helpers/parceNotificationsFromApi';

type IReturn = {
    isLoading: boolean;
    notifications: IUserNotification[];
    setNotifications: React.Dispatch<React.SetStateAction<IUserNotification[]>>;
    reload: () => Promise<void>;
    error: string | undefined;
};

export const useLoadOwnNotifications = (): IReturn => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | undefined>(undefined);
    const [notifications, setNotifications] = React.useState<
        IUserNotification[]
    >([]);
    const { triggerOpen } = useContext(OpenAlertContext);

    const reload = async () => {
        setIsLoading(true);
        setError(undefined);
        const data = await getMyNotifications();

        if (data.ok && data.data) {
            setNotifications(parseNotificationsFromApi(data.data));
            setError(undefined);
        } else {
            setError(t('errorUploadingNotifications') as string);

            triggerOpen({
                severity: 'error',
                text:
                    data.error || (t('errorUploadingNotifications') as string),
            });
        }

        setIsLoading(false);
    };

    return { reload, isLoading, notifications, setNotifications, error };
};

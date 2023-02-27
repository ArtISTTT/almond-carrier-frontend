import {
    IUserNotification,
    IUserNotificationReturn,
} from 'src/interfaces/notifications';
import { mainInstance } from './instance';

export const getMyNotifications = (): Promise<IUserNotificationReturn> =>
    mainInstance
        .get('/notifications/')
        .then(data => {
            return {
                data: data.data.notifications as IUserNotification[],
                ok: true,
                error: undefined,
            };
        })
        .catch(err => {
            return {
                data: undefined,
                ok: false,
                error: err,
            };
        });

export const deleteNotification = (
    notificationId: string
): Promise<IUserNotificationReturn> =>
    mainInstance
        .delete('/notifications/', {
            params: {
                notificationId,
            },
        })
        .then(() => {
            return {
                ok: true,
                error: undefined,
            };
        })
        .catch(err => {
            return {
                ok: false,
                error: err,
            };
        });

export const deleteAllNotifications = (): Promise<IUserNotificationReturn> =>
    mainInstance
        .delete('/notifications/all')
        .then(() => {
            return {
                ok: true,
                error: undefined,
            };
        })
        .catch(err => {
            return {
                ok: false,
                error: err,
            };
        });

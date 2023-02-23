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

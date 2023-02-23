import dayjs from 'dayjs';
import { IUserNotification } from 'src/interfaces/notifications';

export const parseNotificationsFromApi = (notifications: IUserNotification[]) =>
    notifications.map(notification => ({
        ...notification,
        createdDate: dayjs(notification.createdDate).format('D MMM в h:mm'),
    }));

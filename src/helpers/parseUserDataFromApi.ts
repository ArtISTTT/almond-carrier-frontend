import dayjs from 'dayjs';
import { IUser } from '../interfaces/user';

export const parseUserDataFromApi = (user: IUser) => ({
    ...user,
    dateOfBirth: dayjs(user.dateOfBirth),
    phoneNumber: user.phoneNumber ?? '',
    gender: user.gender ?? '',
});

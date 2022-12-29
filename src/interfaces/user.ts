import { Dayjs } from 'dayjs';

export type IUser = {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: Dayjs;
    gender: string | undefined;
    phoneNumber: string | undefined;
};

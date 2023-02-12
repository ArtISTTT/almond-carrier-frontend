import { Dayjs } from 'dayjs';
import { Genders } from './settings';

export type IUser = {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: Dayjs;
    gender: Genders;
    phoneNumber: string;
    avatar?: string;
    completedOrders: number;
    id: string;
};

export interface IUserNotification {
    text: string;
    id: string;
    deal: string;
}

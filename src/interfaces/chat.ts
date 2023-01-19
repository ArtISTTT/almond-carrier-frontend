import { Dayjs } from 'dayjs';

export enum MessageType {
    Mine = 'Mine',
    Other = 'Other',
    Admin = 'Admin',
}

export interface IMessage {
    type: MessageType;
    createdAt: Dayjs;
    messageText: string;
    postedUserId: string;
    readByRecipients: boolean;
}

export interface IMessageServer {
    createdAt: Date;
    messageText: string;
    postedUserId: string;
    readByRecipients: boolean;
}

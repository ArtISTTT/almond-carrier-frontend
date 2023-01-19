import { IMessageServer } from '../chat';

export interface IPostMessage {
    messageText: string;
    orderId: string;
}

export interface IPostMessageReturn {
    error?: string | undefined;
    ok: boolean;
    message?: IMessageServer;
}

export interface IGetMessagesReturn {
    error?: string | undefined;
    ok: boolean;
    messages?: IMessageServer[];
}

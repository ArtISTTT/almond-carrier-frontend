export interface IPostMessage {
    messageText: string;
    orderId: string;
}

export interface IPostMessageReturun {
    error?: string | undefined;
    ok: boolean;
    message?: any;
}

export interface IGetMessagesReturun {
    error?: string | undefined;
    ok: boolean;
    messages?: any[];
}

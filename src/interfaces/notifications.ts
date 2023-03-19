
export interface IUserNotification {
    text: string;
    id: string;
    productName: string;
    createdDate: string;
    orderId: string;
    read: boolean;
    type: string;
}

export interface IUserNotificationReturn {
    data?: IUserNotification[];
    ok: boolean;
    error?: string;
}

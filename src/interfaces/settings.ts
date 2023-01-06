export type IGeneralSettings = {
    country: string;
    language: string;
    currency: string;
    theme: string;
    isAllowToTransferMoney: boolean;
    isUseTwoStepAuthenticationByPhoneNumber: boolean;
};

export type INotifications = {
    notificationsAboutNewsByEmail: boolean;
    notificationsAboutOtherUsersMessages: boolean;
    notificationsAboutChangingOrderStates: boolean;
};

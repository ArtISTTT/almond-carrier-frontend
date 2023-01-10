export enum Language {
    RU = 'ru',
    EN = 'en',
}

export type IGeneralSettings = {
    country: string;
    language: Language;
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

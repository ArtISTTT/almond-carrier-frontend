export enum Language {
    RU = 'ru',
    EN = 'en',
}

export enum Theme {
    DARK = 'Dark',
    LIGHT = 'Light',
}

export enum Currency {
    EUR = 'EUR',
    USD = 'USD',
    RUB = 'RUB',
}

export enum Country {
    RUSSIA = 'Russia',
    USA = 'USA',
    SOVIET = 'Soviet Russia',
}

export type IGeneralSettings = {
    country: Country;
    language: Language;
    currency: Currency;
    theme: Theme;
    isAllowToTransferMoney: boolean;
    isUseTwoStepAuthenticationByPhoneNumber: boolean;
};

export type INotifications = {
    notificationsAboutNewsByEmail: boolean;
    notificationsAboutOtherUsersMessages: boolean;
    notificationsAboutChangingOrderStates: boolean;
};

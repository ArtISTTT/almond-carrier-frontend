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
    Turkey = 'Turkey',
}

export enum Genders {
    MALE = 'Male',
    FEMALE = 'Female',
    OTHER = 'Other',
    NONE = 'None',
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

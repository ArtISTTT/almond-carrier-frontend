import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { toggleTheme } from 'src/helpers/changeTheme';
import {
    Country,
    Currency,
    IGeneralSettings,
    INotifications,
    Language,
    Theme,
} from '../../interfaces/settings';

export const DEFAULT_THEME = Theme.LIGHT;

interface IInitialState {
    generalSettings: IGeneralSettings;
    notifications: INotifications;
}

const initialState: IInitialState = {
    generalSettings: {
        country: Country.RUSSIA,
        language: Language.RU,
        currency: Currency.RUB,
        theme: DEFAULT_THEME,
        isAllowToTransferMoney: false,
        isUseTwoStepAuthenticationByPhoneNumber: false,
    },
    notifications: {
        notificationsAboutNewsByEmail: false,
        notificationsAboutOtherUsersMessages: false,
        notificationsAboutChangingOrderStates: false,
    },
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        changeGeneralSettings: (
            state,
            action: PayloadAction<IGeneralSettings>
        ) => {
            // Theme changing
            localStorage.setItem('theme', action.payload.theme);
            toggleTheme(action.payload.theme);

            // Locale changing
            if (state.generalSettings.language !== action.payload.language) {
                localStorage.setItem('language', action.payload.language);
                dayjs.locale(action.payload.language);
            }

            // Other settings
            state.generalSettings = action.payload;
        },
        changeNotifications: (state, action: PayloadAction<INotifications>) => {
            state.notifications = action.payload;
        },
        changeLanguage: (
            state,
            action: PayloadAction<{
                language: Language;
                updateLocalStorage?: true;
            }>
        ) => {
            state.generalSettings.language = action.payload.language;

            dayjs.locale(action.payload.language);

            if (action.payload.updateLocalStorage) {
                localStorage.setItem('language', action.payload.language);
            }
        },
        changeTheme: (
            state,
            action: PayloadAction<{
                theme: Theme;
            }>
        ) => {
            state.generalSettings.theme = action.payload.theme;
        },
    },
});

export const {
    changeGeneralSettings,
    changeNotifications,
    changeLanguage,
    changeTheme,
} = settingsSlice.actions;
export default settingsSlice.reducer;

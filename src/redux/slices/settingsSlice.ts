import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import {
    Currency,
    IGeneralSettings,
    INotifications,
    Language,
    Theme,
    Country,
} from '../../interfaces/settings';

interface IInitialState {
    generalSettings: IGeneralSettings;
    notifications: INotifications;
}

const initialState: IInitialState = {
    generalSettings: {
        country: Country.RUSSIA,
        language: Language.RU,
        currency: Currency.RUB,
        theme: Theme.LIGHT,
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
            state.generalSettings = action.payload;

            if (state.generalSettings.language !== action.payload.language) {
                localStorage.setItem('language', action.payload.language);
                dayjs.locale(action.payload.language);
            }
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
    },
});

export const { changeGeneralSettings, changeNotifications, changeLanguage } =
    settingsSlice.actions;
export default settingsSlice.reducer;

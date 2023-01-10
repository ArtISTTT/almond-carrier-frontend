import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    IGeneralSettings,
    INotifications,
    Language,
} from '../../interfaces/settings';

interface IInitialState {
    generalSettings: IGeneralSettings;
    notifications: INotifications;
}

const initialState: IInitialState = {
    generalSettings: {
        country: '',
        language: Language.EN,
        currency: '',
        theme: '',
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

            if (action.payload.updateLocalStorage) {
                localStorage.setItem('language', action.payload.language);
            }
        },
    },
});

export const { changeGeneralSettings, changeNotifications, changeLanguage } =
    settingsSlice.actions;
export default settingsSlice.reducer;

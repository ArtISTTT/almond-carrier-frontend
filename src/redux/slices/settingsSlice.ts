import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGeneralSettings, INotifications } from '../../interfaces/settings';

interface IInitialState {
    generalSettings: IGeneralSettings;
    notifications: INotifications;
}

const initialState: IInitialState = {
    generalSettings: {
        country: '',
        language: '',
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
        },
        changeNotifications: (state, action: PayloadAction<INotifications>) => {
            state.notifications = action.payload;
        },
        changeLanguage: (state, action: PayloadAction<string>) => {
            state.generalSettings.language = action.payload;
        },
    },
});

export const { changeGeneralSettings, changeNotifications, changeLanguage } =
    settingsSlice.actions;
export default settingsSlice.reducer;

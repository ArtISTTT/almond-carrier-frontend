import { configureStore } from '@reduxjs/toolkit';

import userSlice from './slices/userSlice';
import ordersSlice from './slices/ordersSlice';
import settingsSlice from './slices/settingsSlice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        settings: settingsSlice,
        orders: ordersSlice,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

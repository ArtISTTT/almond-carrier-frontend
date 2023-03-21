import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import ConfirmDialogLayout from 'src/Components/Layouts/ConfirmDialog';
import SocketIoLayout from 'src/Components/Layouts/SocketIo';
import ThemeProviderLayout from 'src/Components/Layouts/ThemeProviderlayout';
import AuthLayout from '../src/Components/Layouts/Auth';
import SnackBarLayout from '../src/Components/Layouts/Snackbar';
import { store } from '../src/redux';
import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
    dayjs.extend(RelativeTime);

    return (
        <StyledEngineProvider injectFirst>
            <StoreProvider store={store}>
                <ThemeProviderLayout>
                    <AuthLayout>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <ConfirmDialogLayout>
                                <SnackBarLayout>
                                    <SocketIoLayout>
                                        <Component {...pageProps} />
                                    </SocketIoLayout>
                                </SnackBarLayout>
                            </ConfirmDialogLayout>
                        </LocalizationProvider>
                    </AuthLayout>
                </ThemeProviderLayout>
            </StoreProvider>
        </StyledEngineProvider>
    );
};

export default appWithTranslation(App);

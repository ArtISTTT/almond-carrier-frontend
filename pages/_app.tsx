import '../styles/globals.css';
import React from 'react';
import type { AppProps } from 'next/app';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import { theme } from '../src/helpers/themes';
import AuthLayout from '../src/Components/Layouts/Auth';
import { Provider as StoreProvider } from 'react-redux';
import { store } from '../src/redux';
import SnackBarLayout from '../src/Components/Layouts/Snackbar';
import { appWithTranslation } from 'next-i18next';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import RelativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import SocketIoLayout from 'src/Components/Layouts/SocketIo';
import ConfirmDialogLayout from 'src/Components/Layouts/ConfirmDialog';

const App = ({ Component, pageProps }: AppProps) => {
    dayjs.extend(RelativeTime);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <StoreProvider store={store}>
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
                </StoreProvider>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default appWithTranslation(App);

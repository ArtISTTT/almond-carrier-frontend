import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import { theme } from '../src/helpers/themes';
import AuthLayout from '../src/Components/Layouts/Auth';
import { Provider as StoreProvider } from 'react-redux';
import { store } from '../src/redux';
import SnackBarLayout from '../src/Components/Layouts/Snackbar';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <StoreProvider store={store}>
                    <AuthLayout>
                        <SnackBarLayout>
                            <Component {...pageProps} />
                        </SnackBarLayout>
                    </AuthLayout>
                </StoreProvider>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

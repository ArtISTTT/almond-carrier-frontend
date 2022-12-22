import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../src/Components/Layout';
import { ThemeProvider } from '@mui/material';
import { theme } from '../src/helpers/themes';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ThemeProvider>
    );
}

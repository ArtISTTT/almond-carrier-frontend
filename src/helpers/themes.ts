import { createTheme } from '@mui/material';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#6690FD',
        },
        success: {
            main: '#1c9e11',
        },
    },
    typography: {
        fontFamily: 'Nunito',
    },
});

export const darkTheme = createTheme({
    palette: {
        primary: {
            main: '#6690FD',
        },
        success: {
            main: '#1c9e11',
        },
        mode: 'dark',
    },
    typography: {
        fontFamily: 'Nunito',
    },
});

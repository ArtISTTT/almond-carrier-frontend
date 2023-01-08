import { createTheme, experimental_sx as sx } from '@mui/material';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#6690FD',
        },
    },
    typography: {
        fontFamily: 'Mukta',
    },

    // MuiInput: {
    //     styleOverrides: {
    //       root: {
    //         '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
    //           {
    //             display: 'none',
    //           },
    //         '& input[type=number]': {
    //           MozAppearance: 'textfield',
    //         },
    //       },
    //     },
    //   },
    // },
});

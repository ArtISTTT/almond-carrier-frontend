import { ThemeProvider } from '@mui/material';
import React from 'react';
import { darkTheme, theme } from 'src/helpers/themes';
import { Theme } from 'src/interfaces/settings';
import { useAppSelector } from '../../redux/hooks';

type IProps = {
    children: React.ReactNode;
};

export const ThemeProviderLayout: React.FC<IProps> = ({ children }) => {
    const currentTheme = localStorage.getItem('theme');

    return (
        <ThemeProvider theme={currentTheme === Theme.DARK ? darkTheme : theme}>
            {children}
        </ThemeProvider>
    );
};

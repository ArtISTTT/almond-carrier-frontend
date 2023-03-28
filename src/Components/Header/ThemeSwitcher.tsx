import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import React, { useEffect } from 'react';
import { Theme } from 'src/interfaces/settings';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { selectTheme } from 'src/redux/selectors/user';
import { changeTheme } from 'src/redux/slices/settingsSlice';
import styles from '../../../styles/mainLayout.module.css';

const ThemeSwitcher = () => {
    const dispatch = useAppDispatch();
    const localTheme = localStorage.getItem('theme');
    const currentTheme = useAppSelector(selectTheme);

    useEffect(() => {
        if (localTheme !== currentTheme) {
            dispatch(
                changeTheme({
                    theme: localTheme as Theme,
                    updateLocalStorage: true,
                })
            );
        }
    }, []);

    const toggleThemeClick = () => {
        const changedTheme =
            currentTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK;

        dispatch(
            changeTheme({
                theme: changedTheme,
                updateLocalStorage: true,
            })
        );
    };

    return (
        <span onClick={toggleThemeClick} className={styles.themeBlock}>
            {currentTheme === Theme.DARK ? (
                <LightModeIcon className={styles.themeIcon} />
            ) : (
                <DarkModeIcon className={styles.themeIcon} />
            )}
        </span>
    );
};

export default ThemeSwitcher;

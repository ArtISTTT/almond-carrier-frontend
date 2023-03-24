import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import React from 'react';
import { toggleTheme } from 'src/helpers/changeTheme';
import { Theme } from 'src/interfaces/settings';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { selectTheme } from 'src/redux/selectors/user';
import { changeTheme } from 'src/redux/slices/settingsSlice';
import styles from '../../../styles/mainLayout.module.css';

const ThemeSwitcher = () => {
    const dispatch = useAppDispatch();
    const currentTheme = useAppSelector(selectTheme);

    const toggleThemeClick = () => {
        const changedTheme =
            currentTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK;

        dispatch(
            changeTheme({
                theme: changedTheme,
            })
        );
        localStorage.setItem('theme', changedTheme);
        toggleTheme(changedTheme);
    };

    return (
        <span onClick={toggleThemeClick} className={styles.themeBlock}>
            {currentTheme === Theme.DARK ? (
                <Brightness7Icon className={styles.themeIcon} />
            ) : (
                <Brightness4Icon className={styles.themeIcon} />
            )}
        </span>
    );
};

export default ThemeSwitcher;

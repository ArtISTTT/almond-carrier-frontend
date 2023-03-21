import { Theme } from 'src/interfaces/settings';

export const toggleTheme = (theme: Theme) => {
    window.document
        .querySelector('body')
        ?.classList.toggle('dark', theme === Theme.DARK ? true : false);
};

import styles from '../../styles/Footer.module.css';
import React from 'react';
import {
    Avatar,
    Link as MUILink,
    SelectChangeEvent,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { changeLanguage } from '../redux/slices/settingsSlice';
import { Language } from '../interfaces/settings';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import formatSumFunc from '../helpers/formatSumFunc';

const Footer = () => {
    const dispatch = useAppDispatch();
    const { push, route } = useRouter();
    const { t } = useTranslation();

    const { language } = useAppSelector(
        state => state.settings.generalSettings
    );

    const qwe = formatSumFunc(1234567890254);

    const handleChange = (event: SelectChangeEvent) => {
        push(route, undefined, { locale: event.target.value });
        dispatch(
            changeLanguage({
                language: event.target.value as Language,
                updateLocalStorage: true,
            })
        );
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.leftBlock}>
                <FormControl sx={{ width: 250 }}>
                    <InputLabel id='language-label'>{t('language')}</InputLabel>
                    <Select
                        labelId='language-label'
                        id='demo-simple-select'
                        value={language}
                        label='Language'
                        MenuProps={{
                            disableScrollLock: true,
                        }}
                        onChange={handleChange}
                    >
                        <MenuItem value={Language.RU}>{t('russian')}</MenuItem>
                        <MenuItem value={Language.EN}>{t('english')}</MenuItem>
                    </Select>
                </FormControl>
                <Avatar
                    sx={{ width: 55, height: 55 }}
                    src='/static/images/logo.png'
                    alt='logo'
                />
            </div>
            <div className={styles.centerBlock}>
                <div className={styles.centerBlockInner}>
                    <div className={styles.centerColumn}>
                        <Typography
                            variant='h3'
                            component='h3'
                            className={styles.columnTitle}
                        >
                            {t('resources')}
                        </Typography>
                        <MUILink className={styles.centerLink} href='#'>
                            Link
                        </MUILink>
                        <MUILink className={styles.centerLink} href='#'>
                            Link
                        </MUILink>
                        <MUILink className={styles.centerLink} href='#'>
                            Link
                        </MUILink>
                        <MUILink className={styles.centerLink} href='#'>
                            Link
                        </MUILink>
                    </div>
                    <div className={styles.centerColumn}>
                        <Typography
                            variant='h3'
                            component='h3'
                            className={styles.columnTitle}
                        >
                            {t('product')}
                        </Typography>
                        <MUILink className={styles.centerLink} href='#'>
                            Link
                        </MUILink>
                        <MUILink className={styles.centerLink} href='#'>
                            Link
                        </MUILink>
                        <MUILink className={styles.centerLink} href='#'>
                            Link
                        </MUILink>
                        <MUILink className={styles.centerLink} href='#'>
                            Link
                        </MUILink>
                        <MUILink className={styles.centerLink} href='#'>
                            Link
                        </MUILink>
                    </div>
                    <div className={styles.centerColumn}>
                        <Typography
                            variant='h3'
                            component='h3'
                            className={styles.columnTitle}
                        >
                            {t('company')}
                        </Typography>
                        <MUILink className={styles.centerLink} href='#'>
                            Link
                        </MUILink>
                        <MUILink className={styles.centerLink} href='#'>
                            Link
                        </MUILink>
                        <MUILink className={styles.centerLink} href='#'>
                            Link
                        </MUILink>
                        <MUILink className={styles.centerLink} href='#'>
                            Link
                        </MUILink>
                    </div>
                </div>
            </div>
            <div className={styles.rightBlock}>
                <MUILink href='#'>
                    <EmailIcon className={styles.footerIcon} />
                </MUILink>
                <MUILink href='#'>
                    <TelegramIcon className={styles.footerIcon} />
                </MUILink>
                <MUILink href='#'>
                    <InstagramIcon className={styles.footerIcon} />
                </MUILink>
            </div>
        </footer>
    );
};

export default Footer;

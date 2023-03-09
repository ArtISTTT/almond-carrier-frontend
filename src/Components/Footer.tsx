import styles from '../../styles/Footer.module.css';
import React from 'react';
import {
    Avatar,
    SelectChangeEvent,
    FormControl,
    InputLabel,
    Link as MUILink,
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
import { useCreateQueryParams } from 'src/redux/hooks/useCreateQueryParams';
import { LinkBehaviour } from './Common/LinkBehaviour';
import { navigateTo } from 'src/interfaces/navigate';

const Footer = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { t } = useTranslation();

    const { language } = useAppSelector(
        state => state.settings.generalSettings
    );

    const handleChange = (event: SelectChangeEvent) => {
        const queryParams = useCreateQueryParams(router.route, router);

        router.push(
            {
                href: router.route,
                query: queryParams,
            },
            undefined,
            {
                locale: event.target.value,
            }
        );
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
                <FormControl sx={{ width: 250 }} className={styles.input}>
                    <InputLabel id='language-label'>{t('language')}</InputLabel>
                    <Select
                        labelId='language-label'
                        id='demo-simple-select'
                        value={language}
                        label={language === 'en' ? 'Language' : 'Язык'}
                        MenuProps={{
                            disableScrollLock: true,
                        }}
                        onChange={handleChange}
                        className={styles.formControl}
                    >
                        <MenuItem value={Language.RU}>{t('russian')}</MenuItem>
                        <MenuItem value={Language.EN}>{t('english')}</MenuItem>
                    </Select>
                </FormControl>
                <div className={styles.rights}>
                    <Avatar
                        sx={{ width: 55, height: 55 }}
                        src='/static/images/logo.png'
                        alt='logo'
                        className={styles.avatar}
                    />
                    <div className={styles.rightsText}>{t('copyright')}</div>
                </div>
            </div>
            <div className={styles.centerBlock}>
                <div className={styles.centerBlockInner}>
                    <div className={styles.centerColumn}>
                        <Typography
                            variant='h3'
                            component='h3'
                            className={styles.columnTitle}
                        >
                            {t('sitemap')}
                        </Typography>
                        <MUILink
                            className={styles.centerLink}
                            component={LinkBehaviour}
                            href={navigateTo.DASHBOARD}
                        >
                            {t('dashboard')}
                        </MUILink>
                        <MUILink
                            component={LinkBehaviour}
                            className={styles.centerLink}
                            href={navigateTo.ORDER_SEARCH}
                        >
                            {t('orderSearch')}
                        </MUILink>
                        <MUILink
                            component={LinkBehaviour}
                            className={styles.centerLink}
                            href={navigateTo.PROFILE_ORDERS}
                        >
                            {t('profileOrders')}
                        </MUILink>
                        <MUILink
                            component={LinkBehaviour}
                            className={styles.centerLink}
                            href={navigateTo.PROFILE_GENERAL}
                        >
                            {t('myInfo')}
                        </MUILink>
                    </div>
                    <div className={styles.centerColumn}>
                        <Typography
                            variant='h3'
                            component='h3'
                            className={styles.columnTitle}
                        >
                            {t('generalS')}
                        </Typography>
                        {/* <MUILink
                            component={LinkBehaviour}
                            className={styles.centerLink}
                            href={navigateTo.LANDING}
                        >
                            {t('about')}
                        </MUILink> */}
                        <MUILink
                            component={LinkBehaviour}
                            className={styles.centerLink}
                            href={navigateTo.FOUNDERS}
                        >
                            {t('founders')}
                        </MUILink>
                        <MUILink
                            component={LinkBehaviour}
                            className={styles.centerLink}
                            href={navigateTo.PRIVACY_POLICITY}
                        >
                            {t('privacy')}
                        </MUILink>
                        <MUILink
                            component={LinkBehaviour}
                            className={styles.centerLink}
                            href={navigateTo.USER_AGREEMENT}
                        >
                            {t('serviceTerms')}
                        </MUILink>
                    </div>

                    {/* <div className={styles.centerColumn}>
                        <Typography
                            variant='h3'
                            component='h3'
                            className={styles.columnTitle}
                        >
                            {t('help')}
                        </Typography>
                        <MUILink
                            component={LinkBehaviour}
                            className={styles.centerLink}
                            href='#'
                        >
                            {t('FAQ')}
                        </MUILink>
                        <MUILink
                            component={LinkBehaviour}
                            className={styles.centerLink}
                            href='#'
                        >
                            {t('leaveFeedback')}
                        </MUILink>
                        <MUILink
                            component={LinkBehaviour}
                            className={styles.centerLink}
                            href='#'
                        >
                            {t('contactUs')}
                        </MUILink>
                    </div> */}
                </div>
            </div>
            <div className={styles.rightBlock}>
                <div className={styles.rightsSmall}>
                    <Avatar
                        sx={{ width: 55, height: 55 }}
                        src='/static/images/logo.png'
                        alt='logo'
                        className={styles.avatar}
                    />
                    <div className={styles.rightsText}>{t('copyright')}</div>
                </div>
                <div className={styles.icons}>
                    <MUILink
                        className={styles.footerIcon}
                        component={LinkBehaviour}
                        target='_blank'
                        href='mailto:support@friendlycarrier.com'
                    >
                        <EmailIcon sx={{ fontSize: 30 }} />
                    </MUILink>
                    <MUILink
                        className={styles.footerIcon}
                        component={LinkBehaviour}
                        target='_blank'
                        href='https://t.me/friendlycarrier'
                    >
                        <TelegramIcon sx={{ fontSize: 30 }} />
                    </MUILink>
                    {/* <MUILink
                        className={styles.footerIcon}
                        component={LinkBehaviour}
                        href='#'
                    >
                        <InstagramIcon sx={{ fontSize: 30 }} />
                    </MUILink> */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;

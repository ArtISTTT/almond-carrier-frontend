import {
    MenuItem,
    Select,
    Checkbox,
    Typography,
    Container,
    Button,
} from '@mui/material';
import { Stack } from '@mui/system';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../../styles/Settings.module.css';
import {
    Currency,
    IGeneralSettings,
    Language,
} from '../../interfaces/settings';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { changeGeneralSettings } from '../../redux/slices/settingsSlice';
import cn from 'classnames';

const countries = ['Russia', 'USA', 'Soviet Russia'];
const languages = [
    { value: Language.RU, text: 'Russian' },
    { value: Language.EN, text: 'English' },
];
const currency = [Currency.EUR, Currency.USD, Currency.RUB];
const themes = ['Light', 'Dark'];

const GeneralSettings: React.FC = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const userGeneralSettings = useAppSelector(
        state => state.settings.generalSettings
    );
    const router = useRouter();

    const updateGeneralSettings = (form: IGeneralSettings) => {
        dispatch(changeGeneralSettings(form));
        if (form.language !== userGeneralSettings.language) {
            router.push(router.route, undefined, { locale: form.language });
        }
    };

    const formik = useFormik({
        initialValues: userGeneralSettings,
        onSubmit: updateGeneralSettings,
    });

    React.useEffect(() => {
        formik.submitForm();
    }, [formik.values]);

    return (
        <Container className={styles.generalContainer} maxWidth={false}>
            <form onSubmit={formik.handleSubmit}>
                <div className={styles.selectors}>
                    <Stack direction='row' spacing={2} className={styles.stack}>
                        <div className={styles.inputItem}>
                            <label htmlFor='country'>{t('country')}</label>
                            <Select
                                id='country'
                                name='country'
                                value={formik.values.country}
                                onChange={formik.handleChange}
                                MenuProps={{
                                    disableScrollLock: true,
                                }}
                                className={styles.select}
                            >
                                {countries.map((country, i) => (
                                    <MenuItem key={i} value={country}>
                                        {country}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                        <div
                            className={cn(
                                styles.inputItem,
                                styles.inputItemSecond
                            )}
                        >
                            <label htmlFor='language'>{t('language')}</label>
                            <Select
                                id='language'
                                name='language'
                                value={formik.values.language}
                                onChange={formik.handleChange}
                                MenuProps={{
                                    disableScrollLock: true,
                                }}
                                className={styles.select}
                            >
                                {languages.map((language, i) => (
                                    <MenuItem key={i} value={language.value}>
                                        {language.text}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                    </Stack>
                    <Stack direction='row' spacing={2} className={styles.stack}>
                        <div className={styles.inputItem}>
                            <label htmlFor='currency'>{t('currency')}</label>
                            <Select
                                id='currency'
                                name='currency'
                                value={formik.values.currency}
                                onChange={formik.handleChange}
                                MenuProps={{
                                    disableScrollLock: true,
                                }}
                                className={styles.select}
                            >
                                {currency.map((currence, i) => (
                                    <MenuItem key={i} value={currence}>
                                        {currence}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                        <div
                            className={cn(
                                styles.inputItem,
                                styles.inputItemSecond
                            )}
                        >
                            <label htmlFor='theme'>{t('theme')}</label>
                            <Select
                                id='theme'
                                name='theme'
                                value={formik.values.theme}
                                onChange={formik.handleChange}
                                MenuProps={{
                                    disableScrollLock: true,
                                }}
                                className={styles.select}
                            >
                                {themes.map((theme, i) => (
                                    <MenuItem key={i} value={theme}>
                                        {theme}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                    </Stack>
                </div>
                <div className={styles.checkBoxes}>
                    <div className={styles.checkBox}>
                        <Typography
                            className={styles.checkBoxText}
                            variant='body1'
                            component='p'
                        >
                            {t('allowToTransferMyMoney')}
                        </Typography>
                        <Checkbox
                            sx={{
                                '& .MuiSvgIcon-root': { fontSize: 16 },
                            }}
                            id='isAllowToTransferMoney'
                            name='isAllowToTransferMoney'
                            value={formik.values.isAllowToTransferMoney}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className={styles.checkBox}>
                        <Typography
                            className={styles.checkBoxText}
                            variant='body1'
                            component='p'
                        >
                            {t('useTwoStepAuthentication')}
                        </Typography>
                        <Checkbox
                            sx={{
                                '& .MuiSvgIcon-root': { fontSize: 16 },
                            }}
                            id='isUseTwoStepAuthenticationByPhoneNumber'
                            name='isUseTwoStepAuthenticationByPhoneNumber'
                            value={
                                formik.values
                                    .isUseTwoStepAuthenticationByPhoneNumber
                            }
                            onChange={formik.handleChange}
                        />
                    </div>
                </div>
                <div className={styles.deleteAccountBlock}>
                    <Button className={styles.deleteAccountButton}>
                        {t('deleteMyAccount')}
                    </Button>
                    <Typography
                        className={styles.deleteAlert}
                        variant='body2'
                        component='p'
                    >
                        {t('cannotDeleteAccount')}
                    </Typography>
                </div>
            </form>
        </Container>
    );
};

export default GeneralSettings;

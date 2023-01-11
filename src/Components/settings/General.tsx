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
import styles from '../../../styles/Settings.module.css';
import { IGeneralSettings, Language } from '../../interfaces/settings';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { changeGeneralSettings } from '../../redux/slices/settingsSlice';

const countries = ['Russia', 'USA', 'Soviet Russia'];
const languages = [
    { value: Language.RU, text: 'Russian' },
    { value: Language.EN, text: 'English' },
];
const currency = ['Euro', 'Dollar', 'Rubel'];
const themes = ['Light', 'Dark'];

const GeneralSettings: React.FC = () => {
    const dispatch = useAppDispatch();
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
                    <Stack direction='row' spacing={2}>
                        <div className={styles.inputItem}>
                            <label htmlFor='country'>Country</label>
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
                        <div className={styles.inputItem}>
                            <label htmlFor='language'>Language</label>
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
                    <Stack direction='row' spacing={2}>
                        <div className={styles.inputItem}>
                            <label htmlFor='currency'>Currency</label>
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
                        <div className={styles.inputItem}>
                            <label htmlFor='theme'>Theme</label>
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
                            I allow friendly carrier to transfer my money to the
                            cloud
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
                            I want to use two-step authentication by phone
                            number
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
                        Delete My Account
                    </Button>
                    <Typography
                        className={styles.deleteAlert}
                        variant='body2'
                        component='p'
                    >
                        Note that you cannot delete account
                        <br /> if you have a running order
                    </Typography>
                </div>
            </form>
        </Container>
    );
};

export default GeneralSettings;

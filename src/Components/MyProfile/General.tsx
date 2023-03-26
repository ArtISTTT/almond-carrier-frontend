import React, { useContext } from 'react';
import styles from 'styles/General.module.css';
import { Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/selectors/user';
import { useFormik } from 'formik';
import {
    ChangePasswordSchema,
    ChangeUserSchema,
} from '../../schemas/ChangeUserSchema';
import { Stack } from '@mui/system';
import classNames from 'classnames';
import { updateUserInfo, updateUserPassword } from '../../api/auth';
import { OpenAlertContext } from '../Layouts/Snackbar';
import { useAppDispatch } from '../../redux/hooks';
import { addUserData } from '../../redux/slices/userSlice';
import { parseUserDataFromApi } from '../../helpers/parseUserDataFromApi';
import { MuiTelInput } from 'mui-tel-input';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Genders } from 'src/interfaces/settings';
import dayjs, { Dayjs } from 'dayjs';
import {motion} from 'framer-motion'

type IPasswordForm = {
    oldPassword: string;
    newPassword: string;
};

type IForm = {
    email: string;
    firstName: string;
    gender: string;
    phoneNumber: string;
    lastName: string;
    dateOfBirth: Dayjs;
};

const General = () => {
    const user = useSelector(selectUser);
    const dispatch = useAppDispatch();
    const { triggerOpen } = useContext(OpenAlertContext);
    const { t } = useTranslation();

    const availableGenders = [
        { value: Genders.NONE, text: t('none') },
        { value: Genders.MALE, text: t('male') },
        { value: Genders.FEMALE, text: t('female') },
        { value: Genders.OTHER, text: t('other') },
    ];

    const handleChangeUserInfo = async (form: IForm) => {
        const requestData = {
            email: form.email,
            firstName: form.firstName,
            lastName: form.lastName,
            dateOfBirth: form.dateOfBirth,
            gender: form.gender,
            phoneNumber: form.phoneNumber.replace(/ /g, ''),
        };

        const data = await updateUserInfo(requestData);

        if (data.ok && data.user) {
            dispatch(addUserData(parseUserDataFromApi(data.user)));
            triggerOpen({
                severity: 'success',
                text: t('successfullyUpdated'),
            });
        } else {
            triggerOpen({
                severity: 'error',
                text: data.error || t('errorUpdated'),
            });
        }
    };

    const handlePhoneChange = (phone: string) =>
        formik.setFieldValue('phoneNumber', phone);

    const formik = useFormik({
        initialValues: {
            ...user,
            gender: Genders.NONE,
        },
        onSubmit: handleChangeUserInfo,
        validationSchema: ChangeUserSchema,
        validateOnBlur: false,
        validateOnChange: false,
    });

    const handleChangePassword = async (form: IPasswordForm) => {
        const data = await updateUserPassword(form);

        if (data.ok) {
            triggerOpen({
                severity: 'success',
                text: t('passSuccessfullyUpdated'),
            });
        } else {
            triggerOpen({
                severity: 'error',
                text: data.error || t('passErrorUpdated'),
            });
        }
    };

    const formikChangePassword = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
        },
        onSubmit: handleChangePassword,
        validationSchema: ChangePasswordSchema,
        validateOnBlur: false,
        validateOnChange: false,
    });

    return (
        <div className={styles.wrapper}>
            <Typography className={styles.title} variant='h4' component='h3'>
                {t('generalInformation')}
            </Typography>
            <form
                onSubmit={formik.handleSubmit}
                className={classNames(styles.formGeneral, styles.form)}
            >
                <Stack direction='column' spacing={3} width='100%'>
                    <Stack direction='row' spacing={3} className={styles.stack}>
                        <div className={styles.inputItem}>
                            <label htmlFor='firstName'>{t('firstName')}</label>
                            <TextField
                                id='firstName'
                                name='firstName'
                                placeholder={t('firstName') as string}
                                variant='outlined'
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                error={formik.errors.firstName !== undefined}
                                helperText={
                                    formik.errors.firstName &&
                                    (t(formik.errors.firstName) as string)
                                }
                                className={styles.input}
                            />
                        </div>
                        <div
                            className={cn(
                                styles.inputItem,
                                styles.inputItemSecond
                            )}
                        >
                            <label htmlFor='lastName'>{t('lastName')}</label>
                            <TextField
                                className={styles.input}
                                id='lastName'
                                name='lastName'
                                placeholder={t('lastName') as string}
                                variant='outlined'
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                error={formik.errors.lastName !== undefined}
                                helperText={
                                    formik.errors.lastName &&
                                    (t(formik.errors.lastName) as string)
                                }
                            />
                        </div>
                    </Stack>
                    <Stack direction='row' spacing={3} className={styles.stack}>
                        <div className={styles.inputItem}>
                            <label htmlFor='dateOfBirth'>
                                {t('dateOfBirth')}
                            </label>
                            <DesktopDatePicker
                                inputFormat='DD.MM.YYYY'
                                value={formik.values.dateOfBirth}
                                maxDate={dayjs().subtract(18, 'year')}
                                disableFuture={true}
                                onChange={value => {
                                    formik.setFieldValue('dateOfBirth', value);
                                }}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        id='dateOfBirth'
                                        name='dateOfBirth'
                                        variant='outlined'
                                        className={styles.input}
                                        error={
                                            formik.errors.dateOfBirth !==
                                            undefined
                                        }
                                        helperText={
                                            formik.errors.dateOfBirth &&
                                            t('mustBeYears')
                                        }
                                    />
                                )}
                            />
                        </div>
                        <div
                            className={cn(
                                styles.inputItem,
                                styles.inputItemSecond
                            )}
                        >
                            <label htmlFor='gender'>{t('gender')}</label>
                            <Select
                                id='gender'
                                name='gender'
                                placeholder={t('gender') as string}
                                value={formik.values.gender}
                                onChange={formik.handleChange}
                                MenuProps={{
                                    disableScrollLock: true,
                                }}
                                className={styles.select}
                            >
                                {availableGenders.map(gender => (
                                    <MenuItem
                                        key={gender.value}
                                        value={gender.value}
                                    >
                                        {gender.text}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                    </Stack>
                    <Stack direction='row' spacing={3} className={styles.stack}>
                        <div className={styles.inputItem}>
                            <label htmlFor='email'>{t('email')}</label>
                            <TextField
                                id='email'
                                name='email'
                                placeholder={t('email') as string}
                                variant='outlined'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.errors.email !== undefined}
                                helperText={
                                    formik.errors.email &&
                                    (t(formik.errors.email) as string)
                                }
                                className={styles.input}
                            />
                        </div>
                        <div
                            className={cn(
                                styles.inputItem,
                                styles.inputItemSecond
                            )}
                        >
                            <label htmlFor='phoneNumber'>
                                {t('phoneNumber')}
                            </label>
                            <MuiTelInput
                                id='phoneNumber'
                                name='phoneNumber'
                                placeholder={t('phoneNumber') as string}
                                variant='outlined'
                                MenuProps={{
                                    disableScrollLock: true,
                                }}
                                value={formik.values.phoneNumber}
                                onChange={handlePhoneChange}
                                className={cn(styles.input, styles.inputPhone)}
                            />
                        </div>
                    </Stack>
                    <div className={styles.changeToRight}>
                        <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
                            <Button
                                variant='contained'
                                className={styles.confirmButton}
                                type='submit'
                                disabled={formik.isSubmitting}
                            >
                                {t('change')}
                            </Button>
                        </motion.div>
                    </div>
                </Stack>
            </form>
            <form
                onSubmit={formikChangePassword.handleSubmit}
                className={styles.form}
            >
                <Stack direction='column' spacing={3} width='100%'>
                    <Stack direction='row' spacing={3}>
                        <div className={styles.inputItem}>
                            <label htmlFor='firstName'>
                                {t('oldPassword')}
                            </label>
                            <TextField
                                id='oldPassword'
                                name='oldPassword'
                                type='password'
                                placeholder={t('oldPassword') as string}
                                variant='outlined'
                                value={formikChangePassword.values.oldPassword}
                                onChange={formikChangePassword.handleChange}
                                error={
                                    formikChangePassword.errors.oldPassword !==
                                    undefined
                                }
                                helperText={
                                    formikChangePassword.errors.oldPassword &&
                                    (t(
                                        formikChangePassword.errors.oldPassword
                                    ) as string)
                                }
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.inputItem}>
                            <label htmlFor='lastName'>{t('newPassword')}</label>
                            <TextField
                                id='newPassword'
                                name='newPassword'
                                type='password'
                                placeholder={t('newPassword') as string}
                                variant='outlined'
                                value={formikChangePassword.values.newPassword}
                                onChange={formikChangePassword.handleChange}
                                error={
                                    formikChangePassword.errors.newPassword !==
                                    undefined
                                }
                                helperText={
                                    formikChangePassword.errors.newPassword &&
                                    (t(
                                        formikChangePassword.errors.newPassword
                                    ) as string)
                                }
                                className={styles.input}
                            />
                        </div>
                    </Stack>
                    <div className={styles.changeToRight}>
                        <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
                            <Button
                            variant='contained'
                            className={styles.confirmButton}
                            type='submit'
                            disabled={formikChangePassword.isSubmitting}
                            >
                                {t('updatePassword')}
                            </Button>
                        </motion.div>
                    </div>

                </Stack>
            </form>
        </div>
    );
};

export default General;

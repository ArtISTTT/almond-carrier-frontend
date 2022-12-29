import React from 'react';
import styles from '../../../styles/General.module.css';
import { Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/selectors/user';
import { useFormik } from 'formik';
import { IUser } from '../../interfaces/user';
import {
    ChangePasswordSchema,
    ChangeUserSchema,
} from '../../schemas/ChangeUserSchema';
import { Stack, style } from '@mui/system';
import classNames from 'classnames';

type IPasswordForm = {
    password: string;
    confirmPassword: string;
};

const initialState = {
    firstName: 'Artem',
};

const availableGenders = ['Men', 'Women', 'Other'];

const General = () => {
    const user = useSelector(selectUser);

    const handleChangeUserInfo = (form: IUser) => {};

    const formik = useFormik({
        initialValues: user,
        onSubmit: handleChangeUserInfo,
        validationSchema: ChangeUserSchema,
        validateOnBlur: false,
        validateOnChange: false,
    });

    const handleChangePassword = (form: {
        oldPassword: string;
        newPassword: string;
    }) => {
        console.log(form);
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
                General information
            </Typography>
            <form
                onSubmit={formik.handleSubmit}
                className={classNames(styles.formGeneral, styles.form)}
            >
                <Stack direction='column' spacing={3} width='100%'>
                    <Stack direction='row' spacing={3}>
                        <div className={styles.inputItem}>
                            <label htmlFor='firstName'>First name</label>
                            <TextField
                                id='firstName'
                                name='firstName'
                                placeholder='First Name'
                                variant='outlined'
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                error={formik.errors.firstName !== undefined}
                                helperText={formik.errors.firstName}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.inputItem}>
                            <label htmlFor='lastName'>Last name</label>
                            <TextField
                                className={styles.input}
                                id='lastName'
                                name='lastName'
                                placeholder='Last Name'
                                variant='outlined'
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                error={formik.errors.lastName !== undefined}
                                helperText={formik.errors.lastName}
                            />
                        </div>
                    </Stack>
                    <Stack direction='row' spacing={3}>
                        <div className={styles.inputItem}>
                            <label htmlFor='firstName'>Date of Birth</label>
                            <TextField
                                id='dateOfBirth'
                                name='dateOfBirth'
                                placeholder='Date of Birth'
                                type='date'
                                variant='outlined'
                                value={formik.values.dateOfBirth}
                                onChange={formik.handleChange}
                                error={formik.errors.dateOfBirth !== undefined}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.inputItem}>
                            <label htmlFor='lastName'>Gender</label>
                            <Select
                                id='gender'
                                name='gender'
                                placeholder='Gender'
                                value={formik.values.gender}
                                label='Select your gender'
                                onChange={formik.handleChange}
                                MenuProps={{
                                    disableScrollLock: true,
                                }}
                                className={styles.select}
                            >
                                {availableGenders.map(gender => (
                                    <MenuItem key={gender} value={gender}>
                                        {gender}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                    </Stack>
                    <Stack direction='row' spacing={3}>
                        <div className={styles.inputItem}>
                            <label htmlFor='firstName'>Email</label>
                            <TextField
                                id='email'
                                name='email'
                                placeholder='Email'
                                variant='outlined'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.errors.email !== undefined}
                                helperText={formik.errors.email}
                                className={styles.input}
                                disabled={true}
                            />
                        </div>
                        <div className={styles.inputItem}>
                            <label htmlFor='firstName'>Phone number</label>
                            <TextField
                                id='phoneNumber'
                                name='phoneNumber'
                                placeholder='Phone number'
                                variant='outlined'
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                                error={formik.errors.phoneNumber !== undefined}
                                helperText={formik.errors.phoneNumber}
                                className={styles.input}
                            />
                        </div>
                    </Stack>
                    <Button
                        variant='contained'
                        className={styles.confirmButton}
                        type='submit'
                        disabled={formik.isSubmitting}
                    >
                        Change
                    </Button>
                </Stack>
            </form>
            <form
                onSubmit={formikChangePassword.handleSubmit}
                className={styles.form}
            >
                <Stack direction='column' spacing={3} width='100%'>
                    <Stack direction='row' spacing={3}>
                        <div className={styles.inputItem}>
                            <label htmlFor='firstName'>Old Password</label>
                            <TextField
                                id='oldPassword'
                                name='oldPassword'
                                type='password'
                                placeholder='Old Password'
                                variant='outlined'
                                value={formikChangePassword.values.oldPassword}
                                onChange={formikChangePassword.handleChange}
                                error={
                                    formikChangePassword.errors.oldPassword !==
                                    undefined
                                }
                                helperText={
                                    formikChangePassword.errors.oldPassword
                                }
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.inputItem}>
                            <label htmlFor='lastName'>New Password</label>
                            <TextField
                                id='newPassword'
                                name='newPassword'
                                type='password'
                                placeholder='New Password'
                                variant='outlined'
                                value={formikChangePassword.values.newPassword}
                                onChange={formikChangePassword.handleChange}
                                error={
                                    formikChangePassword.errors.newPassword !==
                                    undefined
                                }
                                helperText={
                                    formikChangePassword.errors.newPassword
                                }
                                className={styles.input}
                            />
                        </div>
                    </Stack>
                    <Button
                        variant='contained'
                        className={styles.confirmButton}
                        type='submit'
                        disabled={formikChangePassword.isSubmitting}
                    >
                        Update password
                    </Button>
                </Stack>
            </form>
        </div>
    );
};

export default General;

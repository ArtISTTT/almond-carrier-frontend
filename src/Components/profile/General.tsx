import React, { useContext } from 'react';
import styles from '../../../styles/General.module.css';
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
import { updateUserInfo } from '../../api/auth';
import { OpenAlertContext } from '../Layouts/Snackbar';

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
    dateOfBirth: string;
};

const initialState = {
    firstName: 'Artem',
};

const availableGenders = ['Male', 'Female', 'Other'];

const General = () => {
    const user = useSelector(selectUser);
    const { triggerOpen } = useContext(OpenAlertContext);

    const handleChangeUserInfo = async (form: IForm) => {
        const requestData = {
            firstName: form.firstName,
            lastName: form.lastName,
            dateOfBirth: new Date(form.dateOfBirth),
            gender: form.gender,
            phoneNumber: form.phoneNumber,
        };

        const data = await updateUserInfo(requestData);

        if (data.ok) {
            triggerOpen({
                severity: 'success',
                text: 'User info successfully updated',
            });
        } else {
            triggerOpen({
                severity: 'error',
                text: data.error || 'Error when trying to update user',
            });
        }
    };

    const formik = useFormik({
        initialValues: {
            ...user,
            dateOfBirth: user.dateOfBirth.format('YYYY-MM-DD'),
        },
        onSubmit: handleChangeUserInfo,
        validationSchema: ChangeUserSchema,
        validateOnBlur: false,
        validateOnChange: false,
    });

    const handleChangePassword = (form: IPasswordForm) => {
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
                                onChange={formik.handleChange}
                                MenuProps={{
                                    disableScrollLock: true,
                                }}
                                className={styles.select}
                            >
                                <MenuItem value=''>
                                    <em>None</em>
                                </MenuItem>
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

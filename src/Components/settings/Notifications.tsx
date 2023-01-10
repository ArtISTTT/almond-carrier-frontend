import { Checkbox, Container, Typography } from '@mui/material';
import styles from '../../../styles/Settings.module.css';
import React from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { INotifications } from '../../interfaces/settings';
import { useFormik } from 'formik';
import { changeNotifications } from '../../redux/slices/settingsSlice';

const defaultValues = {
    notificationsAboutNewsByEmail: false,
    notificationsAboutOtherUsersMessages: false,
    notificationsAboutChangingOrderStates: false,
};

const Notifications: React.FC = () => {
    const dispatch = useAppDispatch();

    const updateNotifications = (form: INotifications) => {
        dispatch(changeNotifications(form));
    };

    const formik = useFormik({
        initialValues: defaultValues,
        onSubmit: updateNotifications,
    });

    React.useEffect(() => {
        formik.submitForm();
    }, [formik.values]);

    return (
        <Container className={styles.notificationsContainer} maxWidth={false}>
            <div className={styles.checkBoxesNotifications}>
                <div className={styles.checkBox}>
                    <Typography
                        className={styles.checkBoxText}
                        variant='body1'
                        component='p'
                    >
                        I would like to receive notifications about the news of
                        a friendly carrier
                        <br /> by email
                    </Typography>
                    <Checkbox
                        sx={{
                            '& .MuiSvgIcon-root': { fontSize: 16 },
                        }}
                        id='notificationsAboutNewsByEmail'
                        name='notificationsAboutNewsByEmail'
                        value={formik.values.notificationsAboutNewsByEmail}
                        onChange={formik.handleChange}
                    />
                </div>
                <div className={styles.checkBox}>
                    <Typography
                        className={styles.checkBoxText}
                        variant='body1'
                        component='p'
                    >
                        I would like to receive notifications about other
                        users&apos; messages
                    </Typography>
                    <Checkbox
                        sx={{
                            '& .MuiSvgIcon-root': { fontSize: 16 },
                        }}
                        id='notificationsAboutOtherUsersMessages'
                        name='notificationsAboutOtherUsersMessages'
                        value={
                            formik.values.notificationsAboutOtherUsersMessages
                        }
                        onChange={formik.handleChange}
                    />
                </div>
                <div className={styles.checkBox}>
                    <Typography
                        className={styles.checkBoxText}
                        variant='body1'
                        component='p'
                    >
                        I would like to receive notifications about changing
                        order states
                    </Typography>
                    <Checkbox
                        sx={{
                            '& .MuiSvgIcon-root': { fontSize: 16 },
                        }}
                        id='notificationsAboutChangingOrderStates'
                        name='notificationsAboutChangingOrderStates'
                        value={
                            formik.values.notificationsAboutChangingOrderStates
                        }
                        onChange={formik.handleChange}
                    />
                </div>
            </div>
        </Container>
    );
};

export default Notifications;

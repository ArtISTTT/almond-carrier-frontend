import { Avatar, Button, Rating, Typography } from '@mui/material';
import styles from '../../../styles/Profile.module.css';
import React, { useContext } from 'react';
import cn from 'classnames';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { useRouter } from 'next/router';
import { updateAvatar } from '../../api/auth';
import { OpenAlertContext } from '../Layouts/Snackbar';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/selectors/user';
import { useTranslation } from 'react-i18next';

const UploadAvatar = () => {
    const { pathname } = useRouter();
    const user = useSelector(selectUser);
    const paths = pathname.split('/');
    const { triggerOpen } = useContext(OpenAlertContext);
    const { t } = useTranslation();

    const changeUserImage: React.ChangeEventHandler<
        HTMLInputElement
    > = async event => {
        if (event.target.files && event.target.files.length > 0) {
            const data = await updateAvatar({ avatar: event.target.files[0] });

            if (data.ok) {
                triggerOpen({
                    severity: 'success',
                    text: t('successUpdateAvatar'),
                });
            } else {
                triggerOpen({
                    severity: 'error',
                    text: data.error || t('errorUpdateAvatar'),
                });
            }
        }
    };

    return (
        <div className={styles.avatarWrapper}>
            <Avatar
                src={user.avatar ?? ''}
                className={cn(styles.avatar, {
                    [styles.avatarEdit]: paths[paths.length - 1] === 'general',
                })}
                sx={{ width: 140, height: 140 }}
            />
            <label htmlFor='upload-image'>
                <div className={styles.uploadWrapper}>
                    <input
                        onChange={changeUserImage}
                        accept='image/*'
                        hidden
                        id='upload-image'
                        multiple
                        type='file'
                    />
                    <div className={styles.uploadIcon}>
                        <SystemUpdateAltIcon />
                    </div>
                </div>
            </label>
        </div>
    );
};

export default UploadAvatar;

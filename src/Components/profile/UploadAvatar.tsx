import { Avatar, Button, Rating, Typography } from '@mui/material';
import styles from '../../../styles/Profile.module.css';
import React from 'react';
import cn from 'classnames';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { useRouter } from 'next/router';

const UploadAvatar = () => {
    const { pathname } = useRouter();
    const paths = pathname.split('/');

    const changeUserImage: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            console.log(event.target.value);
        };

    return (
        <div className={styles.avatarWrapper}>
            <Avatar
                src='#'
                alt='Profile Avatar'
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

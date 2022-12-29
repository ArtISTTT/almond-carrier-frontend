import { Avatar, Rating, Typography } from '@mui/material';
import styles from '../../../styles/Profile.module.css';
import React from 'react';
import classNames from 'classnames';

const UploadAvatar = () => {
    const changeUserImage = () => {};

    return (
        <div className={styles.avatarWrapper}>
            <Avatar
                src='#'
                alt='Profile Avatar'
                className={styles.avatar}
                sx={{ width: 140, height: 140 }}
            />
        </div>
    );
};

export default UploadAvatar;

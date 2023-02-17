import React from 'react';
import style from '../../../styles/SignIn.module.css';
import { ClickAwayListener, Avatar, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { navigateTo } from 'src/interfaces/navigate';
import CloseIcon from '@mui/icons-material/Close';

interface IProps {
    setIsFastLoginPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FastLoginPopup: React.FC<IProps> = ({ setIsFastLoginPopupOpen }) => {
    const { t } = useTranslation();
    const router = useRouter();
    const handleClose = () => setIsFastLoginPopupOpen(false);

    const navigateToLogin = () => router.push(navigateTo.SIGNIN);

    return (
        <div className={style.fastLoginPopupWrapper}>
            <ClickAwayListener onClickAway={handleClose}>
                <div className={style.fastLoginPopupInner}>
                    <CloseIcon
                        onClick={handleClose}
                        className={style.closeButton}
                    />
                    <Avatar
                        sx={{ width: 120, height: 120 }}
                        src='/static/images/logo.png'
                        className={style.loginImage}
                        alt='logo'
                    />
                    <Typography
                        className={style.fastLoginTitle}
                        variant='h6'
                        component='h2'
                    >
                        Friendly Carrier
                    </Typography>
                    <Button
                        variant='contained'
                        className={style.confirmButton}
                        onClick={navigateToLogin}
                    >
                        {t('signIn')}
                    </Button>
                </div>
            </ClickAwayListener>
        </div>
    );
};

export default FastLoginPopup;

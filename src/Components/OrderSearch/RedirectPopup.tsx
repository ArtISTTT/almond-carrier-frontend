import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Button, ClickAwayListener, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import style from '../../../styles/SignIn.module.css';

interface IProps {
    completeFunction: () => void;
    textButton: string;
    setIsFastLoginPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RedirectPopup: React.FC<IProps> = ({
    setIsFastLoginPopupOpen,
    textButton,
    completeFunction,
}) => {
    const { t } = useTranslation();
    const handleClose = () => setIsFastLoginPopupOpen(false);

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
                        onClick={completeFunction}
                    >
                        {t(textButton)}
                    </Button>
                </div>
            </ClickAwayListener>
        </div>
    );
};

export default RedirectPopup;

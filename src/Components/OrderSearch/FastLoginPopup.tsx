import React from 'react';
import style from '../../../styles/SignIn.module.css';
import { ClickAwayListener, Avatar } from '@mui/material';
import SignInBlock from 'pages/signin/SignInBlock';

const FastLoginPopup = ({
    setIsFastLoginPopupOpen,
}: {
    setIsFastLoginPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const handleClose = () => setIsFastLoginPopupOpen(false);

    return (
        <div className={style.fastLoginPopupWrapper}>
            <ClickAwayListener onClickAway={handleClose}>
                <div className={style.fastLoginPopupInner}>
                    <Avatar
                        sx={{ width: 120, height: 120 }}
                        src='/static/images/logo.png'
                        className={style.loginImage}
                        alt='logo'
                    />
                    <SignInBlock />
                </div>
            </ClickAwayListener>
        </div>
    );
};

export default FastLoginPopup;

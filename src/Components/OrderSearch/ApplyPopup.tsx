import React from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Typography from '@mui/material/Typography';
import styles from '../../../styles/ApplyPopup.module.css';
import Avatar from '@mui/material/Avatar';

interface IProps {
    closePopup: () => void;
    children: React.ReactNode;
}

const ApplyPopup: React.FC<IProps> = ({ closePopup, children }) => {
    const closePopupFunc = () => closePopup();

    return (
        <div className={styles.popupWrapper}>
            <div className={styles.popup}>
                <div onClick={closePopupFunc} className={styles.icon}>
                    <HighlightOffIcon />
                </div>
                {children}
            </div>
        </div>
    );
};

export default ApplyPopup;

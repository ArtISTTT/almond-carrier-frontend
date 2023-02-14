import React from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import styles from '../../../styles/ApplyPopup.module.css';

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

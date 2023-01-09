import { Typography } from '@mui/material';
import styles from '../../../styles/Popup.module.css';
import React from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const valutes = ['Rubles', 'Euro', 'Dollar'];

const deliverPlaces = ['Russia', 'Antalya'];

interface IProps {
    title: string;
    closePopup: () => void;
    children: React.ReactNode;
}

const Popup: React.FC<IProps> = ({ title, closePopup, children }) => {
    return (
        <div className={styles.popup}>
            <div onClick={closePopup} className={styles.icon}>
                <HighlightOffIcon />
            </div>
            <Typography
                className={styles.popupTitle}
                variant='h3'
                component='h3'
            >
                {title}
            </Typography>
            {children}
        </div>
    );
};

export default Popup;

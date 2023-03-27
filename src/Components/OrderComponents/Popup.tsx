import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';
import React from 'react';
import styles from '../../../styles/Popup.module.css';

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
            <div className={styles.bgTop} />

            <div onClick={closePopup} className={styles.icon}>
                <CloseIcon />
            </div>
            <Typography
                className={styles.popupTitle}
                variant='h3'
                component='h3'
            >
                {title}
            </Typography>
            {children}
            <img
                className={styles.bgBottom}
                src='/static/images/add-order/AddOrderBottom.png'
            />
        </div>
    );
};

export default Popup;

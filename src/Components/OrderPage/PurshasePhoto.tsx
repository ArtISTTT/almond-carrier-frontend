import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import styles from '../../../styles/OrderPage.module.css';

type IProps = {
    openedPhoto: string;
    setOpenedPhoto: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const PurshasePhoto: React.FC<IProps> = ({ openedPhoto, setOpenedPhoto }) => {
    const closePhoto = () => setOpenedPhoto(undefined);

    const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    return (
        <div onClick={closePhoto} className={styles.purchasePhotoWrapper}>
            <div
                onClick={stopPropagation}
                className={styles.purchasePhotoInner}
            >
                <CloseIcon
                    onClick={closePhoto}
                    className={styles.purchaseIcon}
                />
                <img className={styles.purchasePhotoOpened} src={openedPhoto} />
            </div>
        </div>
    );
};

export default PurshasePhoto;

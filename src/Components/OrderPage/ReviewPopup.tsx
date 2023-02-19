import { Rating, Typography } from '@mui/material';
import React from 'react';
import styles from '../../../styles/ReviewItem.module.css';
import { ViewType } from './OrderInputItem';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';

interface IProps {
    closeReviewPopup: React.Dispatch<React.SetStateAction<boolean>>;
    fullName: string;
    rating: number;
    reviewText: string;
    reviewerType: ViewType;
}

const ReviewPopup: React.FC<IProps> = ({
    closeReviewPopup,
    fullName,
    rating,
    reviewText,
    reviewerType,
}) => {
    const { t } = useTranslation();
    const closePopup = () => closeReviewPopup(false);
    return (
        <div className={styles.reviewPopupWrapper}>
            <div className={styles.reviewPopuploseIcon} onClick={closePopup}>
                <CloseIcon />
            </div>
            <div className={styles.reviewPopupTitle}>
                <h4>{fullName}</h4>
                <span>{t(reviewerType) as string}</span>
            </div>
            <Typography
                variant='body1'
                component='p'
                className={styles.reviewPopupContent}
            >
                {reviewText}
            </Typography>
            <Rating
                className={styles.reviewPopupParams}
                defaultValue={rating}
                readOnly
                precision={0.5}
            />
        </div>
    );
};

export default ReviewPopup;

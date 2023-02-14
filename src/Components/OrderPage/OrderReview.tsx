import React from 'react';
import styles from '../../../styles/ReviewBlock.module.css';
import { Rating, TextField, Button, Typography } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useFormik } from 'formik';
import { ReviewSchema } from 'src/schemas/ReviewSchema';
import { useTranslation } from 'react-i18next';

interface IProps {
    setIsReviewBlockOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface Iform {
    reviewText: string;
    rating: number;
}

const OrderReview = ({ setIsReviewBlockOpen }: IProps) => {
    const { t } = useTranslation();

    const sendReview = (form: Iform) => {
        // console.log(form);

        setIsReviewBlockOpen(false);
    };

    const formik = useFormik({
        initialValues: {
            reviewText: '',
            rating: 0,
        },
        onSubmit: sendReview,
        validationSchema: ReviewSchema,
        validateOnBlur: false,
        validateOnChange: false,
    });

    return (
        <div className={styles.reviewBlockWrapper}>
            <div className={styles.closeIcon}>
                <HighlightOffIcon
                    onClick={() => setIsReviewBlockOpen(false)}
                    sx={{ cursor: 'pointer' }}
                />
            </div>

            <div className={styles.reviewContent}>
                <div className={styles.personInfo}>
                    <Typography variant='h4' component='h3' className={styles.titleText}>
                        {t('congratulations')}
                    </Typography>
                </div>

                <form
                    className={styles.reviewForm}
                    onSubmit={formik.handleSubmit}
                    action='submit'
                >
                    <div className={styles.ratingBlock}>
                        <div className={styles.ratingBlockText}>
                            {t('rateCarrier')} <span className={styles.rateName}>Nikita</span> 
                        </div>
                        <Rating
                            className={styles.ratingStars}
                            name='rating'
                            id='rating'
                            value={formik.values.rating}
                            onChange={formik.handleChange}
                            precision={0.5}
                        />
                    </div>
                    <div className={styles.reviewInput}>
                        <label htmlFor='Review'></label>
                        <TextField
                            label='Review'
                            name='reviewText'
                            variant='outlined'
                            color='primary'
                            className={styles.reviewTextInput}
                            multiline
                            rows={11}
                            maxRows={12}
                            value={formik.values.reviewText}
                            onChange={formik.handleChange}
                            error={formik.errors.reviewText !== undefined}
                            helperText={
                                formik.errors.reviewText &&
                                (t(formik.errors.reviewText) as string)
                            }
                        />
                    </div>
                    <Button
                        type='submit'
                        color='primary'
                        className={styles.submitButton}
                        variant='contained'
                    >
                        {t('sendReview')}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default OrderReview;

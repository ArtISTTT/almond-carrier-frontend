import React, { useContext, useState } from 'react';
import styles from '../../../styles/ReviewBlock.module.css';
import { Rating, TextField, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import { ReviewSchema } from 'src/schemas/ReviewSchema';
import { useTranslation } from 'react-i18next';
import { sendReview } from 'src/api/review';
import { ViewType } from './OrderInputItem';
import { OpenAlertContext } from '../Layouts/Snackbar';

interface IProps {
    setIsReviewBlockOpen: React.Dispatch<React.SetStateAction<boolean>>;
    orderId: string;
    reviewerType: ViewType;
    userForId: string;
    personFullName: string;
}
interface Iform {
    reviewText: string;
    rating: number;
}

const OrderReview: React.FC<IProps> = ({
    setIsReviewBlockOpen,
    personFullName,
    orderId,
    reviewerType,
    userForId,
}) => {
    const { t } = useTranslation();
    const { triggerOpen } = useContext(OpenAlertContext);
    const [isSendButtonDisabled, setIsSendButtonDisabled] = useState(false);

    const sendReviewFormik = async (form: Iform) => {
        setIsSendButtonDisabled(true);
        const data = await sendReview({
            orderId,
            reviewerType,
            userForId,
            text: form.reviewText,
            rating: form.rating,
        });

        if (data.ok) {
            triggerOpen({
                severity: 'success',
                text: 'Отзыв успешно оставлен', // ЛОКАЛИЗАЦИЯ
            });
            setIsReviewBlockOpen(false);
        } else {
            triggerOpen({
                severity: 'error',
                text: 'Ошибка при оставлении отзыва', // ЛОКАЛИЗАЦИЯ
            });
        }
        setIsSendButtonDisabled(false);
    };

    const formik = useFormik({
        initialValues: {
            reviewText: '',
            rating: 5,
        },
        onSubmit: sendReviewFormik,
        validationSchema: ReviewSchema,
        validateOnBlur: false,
        validateOnChange: false,
    });

    return (
        <div className={styles.reviewBlockWrapper}>
            <div className={styles.closeIcon}>
                <CloseIcon
                    onClick={() => setIsReviewBlockOpen(false)}
                    sx={{ cursor: 'pointer' }}
                />
            </div>

            <div className={styles.reviewContent}>
                <div className={styles.personInfo}>
                    <Typography
                        variant='h4'
                        component='h3'
                        className={styles.titleText}
                    >
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
                            {reviewerType === ViewType.receiver
                                ? t('rateCarrier')
                                : t('rateReceiver')}
                            <span className={styles.rateName}>
                                {personFullName}
                            </span>
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
                        disabled={isSendButtonDisabled}
                    >
                        {t('sendReview')}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default OrderReview;

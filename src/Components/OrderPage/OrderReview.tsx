import React from 'react';
import styles from '../../../styles/ReviewBlock.module.css';
import { Rating, TextField, Button } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useFormik } from 'formik';

interface IProps {
    setIsReviewBlockOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrderReview = ({ setIsReviewBlockOpen }: IProps) => {
    const sendReview = () => {};

    const formik = useFormik({
        initialValues: {
            rewiewText: '',
            rating: '',
        },
        onSubmit: sendReview,
        // validationSchema: EmailSchema,
        // validateOnBlur: false,
        // validateOnChange: false,
    });

    return (
        <div className={styles.reviewBlockWrapper}>
            <div className={styles.closeIcon}>
                <HighlightOffIcon
                    onClick={() => setIsReviewBlockOpen(false)}
                    sx={{ cursor: 'pointer' }}
                />
            </div>
            <div>qwe</div>

            <form onSubmit={formik.handleSubmit} action='submit'>
                <div className={styles.ratingBlock}>
                    <div>Поставьте рейтинг челу</div>
                    <Rating
                        className={styles.ratingStars}
                        name='half-rating'
                        defaultValue={2.5}
                        precision={0.5}
                    />
                </div>

                <div className={styles.reviewBlock}>
                    <TextField
                        id='review'
                        name='review'
                        variant='outlined'
                        color='primary'
                        // placeholder={t('email') as string}
                        // className={styles.emailInput}
                        value={formik.values.rewiewText}
                        onChange={formik.handleChange}
                        // error={formik.errors.email !== undefined}
                        // helperText={
                        //     formik.errors.email &&
                        //     (t(formik.errors.email) as string)
                        // }
                    />
                    <Button
                        type='submit'
                        color='primary'
                        // disabled={formik.isSubmitting}
                        className={styles.submitButton}
                        variant='contained'
                    >
                        Send Review
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default OrderReview;

import * as Yup from 'yup';

export const ReviewSchema = Yup.object().shape({
    reviewText: Yup.string(),
});

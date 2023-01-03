import * as Yup from 'yup';

export const PopupSchema = Yup.object().shape({
    item: Yup.string()
        .lowercase()
        .matches(/[a-z]/, 'The short name must not contain numbers.')
        .required('The short name is required'),
    reward: Yup.number()
        .typeError('Amount must be a number')
        .nullable()
        .required('The reward is required'),
    suggestedBenefit: Yup.number()
        .nullable()
        .typeError('Amount must be a number')
        .required('The suggested benefit is required'),
    weight: Yup.number()
        .typeError('Amount must be a number')
        .nullable()
        .required('The weight is required'),
    description: Yup.string(),
});

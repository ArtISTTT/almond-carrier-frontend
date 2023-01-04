import * as Yup from 'yup';

export const ReceiverPopupSchema = Yup.object().shape({
    toLocation: Yup.string().min(1).required('Location in required'),
    fromLocation: Yup.string().min(1),
    productName: Yup.string()
        .lowercase()
        .matches(/[a-z]/, 'The short name must not contain numbers.')
        .required('The short name is required'),
    rewardAmount: Yup.number().min(0).required('Reward is required'),
    productAmount: Yup.number().min(0).required('Product amount is required'),
    productWeight: Yup.number()
        .min(0.1, 'Weight must be greater than 0.1kg')
        .required('Product weight is required'),
    productDescription: Yup.string().required('Description weight is required'),
});

export const CarrierPopupSchema = Yup.object().shape({
    toLocation: Yup.string().min(1).required('Location in required'),
    fromLocation: Yup.string().min(1).required('Location in required'),
    rewardAmount: Yup.number().min(0).required('Reward is required'),
    carrierMaxWeight: Yup.number()
        .min(0.1, 'Max weight must be greater than 0.1kg')
        .required('Product weight is required'),
    arrivalDate: Yup.date().min(new Date(), 'Please choose future date'),
});

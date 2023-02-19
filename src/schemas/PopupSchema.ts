import * as Yup from 'yup';

export const ReceiverPopupSchema = Yup.object().shape({
    toLocation: Yup.string().min(1).required('required'),
    fromLocation: Yup.string().min(1),
    productName: Yup.string().lowercase().required('required'),
    productLink: Yup.string().url('mustBeLink'),
    rewardAmount: Yup.number()
        .nullable()
        .min(1, 'correctProductPrice')
        .required('required'),
    productAmount: Yup.number()
        .nullable()
        .min(1, 'correctProductPrice')
        .required('required'),
    productWeight: Yup.number()
        .nullable()
        .min(0.1, 'greaterWeight')
        .max(40, 'maxWeightInput')
        .required('required'),
    productDescription: Yup.string(),
});

export const CarrierPopupSchema = Yup.object().shape({
    toLocation: Yup.string().min(1).required('required'),
    fromLocation: Yup.string().min(1).required('required'),
    rewardAmount: Yup.number()
        .nullable()
        .min(1, 'correctProductPrice')
        .required('required'),

    carrierMaxWeight: Yup.number()
        .nullable()
        .min(0.1, 'greaterWeight')
        .max(40, 'maxWeightInput')
        .required('required'),
    arrivalDate: Yup.date().required('required'),
});

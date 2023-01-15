import * as Yup from 'yup';

export const ReceiverPopupSchema = Yup.object().shape({
    toLocation: Yup.string().min(1).required('required'),
    fromLocation: Yup.string().min(1),
    productName: Yup.string().lowercase().required('required'),
    rewardAmount: Yup.number()
        .min(1, 'correctProductPrice')
        .required('required'),
    productAmount: Yup.number()
        .min(1, 'correctProductPrice')
        .required('required'),
    productWeight: Yup.number().min(0.1, 'greaterWeight').required('required'),
    productDescription: Yup.string().required('required'),
});

const today = new Date();

export const CarrierPopupSchema = Yup.object().shape({
    toLocation: Yup.string().min(1).required('required'),
    fromLocation: Yup.string().min(1).required('required'),
    rewardAmount: Yup.number()
        .min(1, 'correctProductPrice')
        .required('required'),
    carrierMaxWeight: Yup.number()
        .min(0.1, 'greaterWeight')
        .required('required'),
    arrivalDate: Yup.date()
        .min(
            new Date(new Date(today).setDate(today.getDate() + 1)),
            'futureDate'
        )
        .required('required'),
});

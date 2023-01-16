import * as Yup from 'yup';

export const CarrierApplyPopupSchema = Yup.object().shape({
    productName: Yup.string()
        .min(2, 'tooShort')
        .max(60, 'tooLong')
        .required('required'),
    productAmount: Yup.number().min(0).required('required'),
    productWeight: Yup.number().min(0.1, 'greaterWeight').required('required'),
    productDescription: Yup.string(),
});

const today = new Date();

export const ReceiverApplyPopupSchema = Yup.object().shape({
    fromLocation: Yup.string().min(0),
    arrivalDate: Yup.date()
        .min(
            new Date(new Date(today).setDate(today.getDate() + 1)),
            'futureDate'
        )
        .required('required'),
});

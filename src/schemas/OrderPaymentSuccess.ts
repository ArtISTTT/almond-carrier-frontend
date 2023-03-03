import * as Yup from 'yup';

export const OrderPaymentSuccessSchema = Yup.object().shape({
    phone: Yup.string().required('required'),
});

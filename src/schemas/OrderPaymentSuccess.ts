import * as Yup from 'yup';

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const OrderPaymentSuccessSchema = Yup.object().shape({
    phone: Yup.string().matches(phoneRegExp, 'notValid'),
});

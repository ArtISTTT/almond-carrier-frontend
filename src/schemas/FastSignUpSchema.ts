import * as Yup from 'yup';

export const FastSignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'tooShort')
        .max(50, 'tooLong')
        .required('required'),
    lastName: Yup.string()
        .min(2, 'tooShort')
        .max(50, 'tooLong')
        .required('required'),
    email: Yup.string().email('invalidEmail').required('required'),
});

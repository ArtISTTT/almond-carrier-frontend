import * as Yup from 'yup';

export const SigninSchema = Yup.object().shape({
    email: Yup.string().email('invalidEmail').required('required'),
    password: Yup.string()
        .min(8, 'passwordLong')
        .matches(/[0-9]/, 'passwordRequiresNumbers')
        .matches(/[a-z]/, 'passwordRequiresLowercaseLetter')
        .matches(/[A-Z]/, 'passwordRequiresUppercaseLetter')
        .required('required'),
});

import * as Yup from 'yup';

const nameRegex = /^[A-Za-z0-9]+$/;

export const SigninSchema = Yup.object().shape({
    email: Yup.string().email('invalidEmail').required('required'),
    password: Yup.string()
        .min(8, 'passwordLong')
        .matches(nameRegex, 'onlyEnglish')
        .matches(/[0-9]/, 'passwordRequiresNumbers')
        .matches(/[a-z]/, 'passwordRequiresLowercaseLetter')
        .matches(/[A-Z]/, 'passwordRequiresUppercaseLetter')
        .required('required'),
});

import * as Yup from 'yup';

export const RecoverPasswordSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, 'passwordLong')
        .matches(/[0-9]/, 'passwordRequiresNumbers')
        .matches(/[a-z]/, 'passwordRequiresLowercaseLetter')
        .matches(/[A-Z]/, 'passwordRequiresUppercaseLetter')
        .required('required'),
    confitmPassword: Yup.string(),
    userId: Yup.string(),
    token: Yup.string(),
});

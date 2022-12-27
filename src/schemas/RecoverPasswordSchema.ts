import * as Yup from 'yup';

export const RecoverPasswordSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, 'Password must be 8 characters long')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .required('Required'),
    confitmPassword: Yup.string(),
    userId: Yup.string(),
    token: Yup.string(),
});

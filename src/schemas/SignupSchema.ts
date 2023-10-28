import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'tooShort')
        .max(50, 'tooLong')
        .required('required'),
    lastName: Yup.string()
        .min(2, 'tooShort')
        .max(50, 'tooLong')
        .required('required'),
    email: Yup.string().email('invalidEmail').required('required'),
    password: Yup.string()
        .min(8, 'passwordLong')
        .matches(/[0-9]/, 'passwordRequiresNumbers')
        .matches(/[a-z]/, 'passwordRequiresLowercaseLetter')
        .matches(/[A-Z]/, 'passwordRequiresUppercaseLetter')
        .required('required'),
    confirmPassword: Yup.string()
        .test('passwords-match', 'passwordsMustMatch', function (value) {
            return this.parent.password === value;
        })
        .required('required'),
    dateOfBirth: Yup.date()
        .max(new Date(Date.now() - 567648000000), 'mustBeYears')
        .required('required'),
});
